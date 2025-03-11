
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
          throw new Error('Zamawiający nie wypełnił jeszcze swojej ankiety. Spróbuj ponownie później.');
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

  return {
    partnerOrderId,
    selectedQuestionIds,
    error,
    isLoading,
    dataFetched
  };
};
