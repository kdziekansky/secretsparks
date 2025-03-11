
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
        
        // Get the order associated with this partner token
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('id')
          .eq('partner_survey_token', partnerToken)
          .single();
        
        if (orderError || !orderData) {
          throw new Error('Nie znaleziono ankiety lub link jest nieprawidłowy');
        }
        
        console.log('Found order with ID:', orderData.id);
        setPartnerOrderId(orderData.id);
        setOrderFetched(true);
        
        // Pobierz odpowiedzi Zamawiającego z tabeli survey_responses
        // WAŻNE: Użyj .neq('user_type', 'partner') zamiast .eq('user_type', 'user') 
        // gdyż w niektórych rekordach 'user_type' może mieć inne wartości
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
        
        // Bardziej szczegółowe logowanie aby zobaczyć co dokładnie jest w odpowiedzi
        console.log('User responses from survey_responses:', userResponses);
        console.log('User responses raw data:', JSON.stringify(userResponses));
        
        // Jeśli są odpowiedzi użytkownika, użyj ich do utworzenia sekwencji pytań
        if (userResponses && userResponses.length > 0) {
          // Wyodrębnij ID pytań w kolejności, w jakiej na nie odpowiedziano
          const questionIds = userResponses.map(response => response.question_id);
          console.log(`Found ${questionIds.length} questions from user responses:`, questionIds);
          
          // Dodaj dodatkowe logowanie dla weryfikacji
          console.log('Question IDs sequence for partner:', JSON.stringify(questionIds));
          
          setSelectedQuestionIds(questionIds);
          setDataFetched(true);
          toast.success('Ankieta załadowana pomyślnie');
          setIsLoading(false);
          return;
        }
        
        // Jeśli dotarliśmy tutaj, nie ma jeszcze odpowiedzi użytkownika
        console.log('No user responses found for this order');
        throw new Error('Zamawiający nie wypełnił jeszcze swojej ankiety. Spróbuj ponownie później.');
        
      } catch (err: any) {
        console.error('Error in fetchOrderData:', err);
        setError(err.message || 'Wystąpił błąd podczas ładowania ankiety');
        // Oznacz jako pobrane, aby zapobiec nieskończonym próbom
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
