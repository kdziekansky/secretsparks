import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePartnerSurveyData = (partnerToken: string | null) => {
  const [partnerOrderId, setPartnerOrderId] = useState<string | null>(null);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [orderFetched, setOrderFetched] = useState(false);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const MAX_POLLING_ATTEMPTS = 15; // 30 sekund próbowania (15 * 2s)

  // Fetch order data and question sequence for partners
  useEffect(() => {
    // Skip if we've already fetched successfully or if we don't have a token
    if (!partnerToken || dataFetched || orderFetched) return;
    
    const fetchOrderData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Fetching order details for partner token:', partnerToken);
        
        // First, try to get the order with stored user_question_sequence
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('id, user_question_sequence')
          .eq('partner_survey_token', partnerToken)
          .single();
        
        if (orderError || !orderData) {
          console.error('Order fetch error:', orderError);
          throw new Error('Nie znaleziono ankiety lub link jest nieprawidłowy');
        }
        
        console.log('Found order with ID:', orderData.id);
        setPartnerOrderId(orderData.id);
        setOrderFetched(true);
        
        // FIRST APPROACH: Check if we have stored question sequence in the orders table
        if (orderData.user_question_sequence && orderData.user_question_sequence.length > 0) {
          console.log('Using stored question sequence from orders table:', orderData.user_question_sequence);
          setSelectedQuestionIds(orderData.user_question_sequence);
          setDataFetched(true);
          toast.success('Ankieta załadowana pomyślnie');
          setIsLoading(false);
          return;
        }
        
        console.log('No stored question sequence in orders table, fetching from survey_responses');
        
        // SECOND APPROACH: If not stored in orders table, get from survey_responses
        const { data: userResponses, error: responsesError } = await supabase
          .from('survey_responses')
          .select('question_id, created_at')
          .eq('order_id', orderData.id)
          .eq('user_type', 'user')
          .order('created_at', { ascending: true });
        
        if (responsesError) {
          console.error('Error fetching user responses:', responsesError);
          throw new Error('Nie można pobrać sekwencji pytań zamawiającego');
        }
        
        console.log('User responses from survey_responses:', userResponses);
        
        // If no user responses found, show a clear error message
        if (!userResponses || userResponses.length === 0) {
          console.log('No user responses found for this order');
          setIsLoading(false);
          // Nie rzucamy wyjątku, tylko ustawiamy ID zamówienia i pozwalamy na polling
          return;
        }
        
        // Extract question IDs in order they were answered by user
        const questionIds = userResponses.map(response => response.question_id);
        console.log(`Found ${questionIds.length} questions from user responses:`, questionIds);
        
        // IMPROVEMENT: Also store the sequence in the orders table for future use
        const { error: updateError } = await supabase
          .from('orders')
          .update({ user_question_sequence: questionIds })
          .eq('id', orderData.id);
        
        if (updateError) {
          console.warn('Could not update order with question sequence:', updateError);
          // Continue anyway, this is just an optimization
        } else {
          console.log('Updated order with question sequence for future use');
        }
        
        setSelectedQuestionIds(questionIds);
        setDataFetched(true);
        toast.success('Ankieta załadowana pomyślnie');
        
      } catch (err: any) {
        console.error('Error in fetchOrderData:', err);
        setError(err.message || 'Wystąpił błąd podczas ładowania ankiety');
        // Mark as fetched to prevent infinite retry loops
        setOrderFetched(true);
        setDataFetched(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [partnerToken, dataFetched, orderFetched]);

  // Dodajemy nowy useEffect dla pollingu
  useEffect(() => {
    // Jeśli mamy token i ID zamówienia, ale brak sekwencji pytań, uruchamiamy polling
    if (partnerToken && partnerOrderId && !dataFetched && selectedQuestionIds.length === 0 && pollingAttempts < MAX_POLLING_ATTEMPTS) {
      console.log(`Starting polling attempt ${pollingAttempts + 1} for question sequence`);
      
      const pollTimer = setTimeout(async () => {
        console.log('Polling for question sequence...');
        try {
          // Próbujemy ponownie pobrać dane z orders
          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .select('user_question_sequence')
            .eq('id', partnerOrderId)
            .single();
            
          if (!orderError && orderData?.user_question_sequence?.length > 0) {
            console.log('Polling successful, found question sequence:', orderData.user_question_sequence);
            setSelectedQuestionIds(orderData.user_question_sequence);
            setDataFetched(true);
            toast.success('Ankieta załadowana pomyślnie');
          } else {
            // Spróbuj jeszcze raz pobrać z survey_responses
            const { data: userResponses, error: responsesError } = await supabase
              .from('survey_responses')
              .select('question_id, created_at')
              .eq('order_id', partnerOrderId)
              .eq('user_type', 'user')
              .order('created_at', { ascending: true });
            
            if (!responsesError && userResponses && userResponses.length > 0) {
              const questionIds = userResponses.map(response => response.question_id);
              console.log(`Polling found ${questionIds.length} questions from responses`);
              
              // Zapisz sekwencję w orders
              await supabase
                .from('orders')
                .update({ user_question_sequence: questionIds })
                .eq('id', partnerOrderId);
                
              setSelectedQuestionIds(questionIds);
              setDataFetched(true);
              toast.success('Ankieta załadowana pomyślnie');
            } else {
              // Zwiększamy licznik prób
              setPollingAttempts(prev => prev + 1);
            }
          }
        } catch (err) {
          console.error('Polling error:', err);
          setPollingAttempts(prev => prev + 1);
        }
      }, 2000);
      
      return () => clearTimeout(pollTimer);
    } else if (pollingAttempts >= MAX_POLLING_ATTEMPTS && !dataFetched) {
      console.warn('Maximum polling attempts reached without finding question sequence');
      setError('Nie udało się pobrać sekwencji pytań. Zamawiający musi najpierw wypełnić swoją ankietę.');
      setDataFetched(true); // Zapobiegamy dalszemu pollingowi
    }
  }, [partnerToken, partnerOrderId, dataFetched, selectedQuestionIds, pollingAttempts]);

  return {
    partnerOrderId,
    selectedQuestionIds,
    error,
    isLoading,
    dataFetched
  };
};