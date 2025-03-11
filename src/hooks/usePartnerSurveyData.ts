
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
          .select('id, user_gender, partner_gender, game_level, user_question_sequence')
          .eq('partner_survey_token', partnerToken)
          .single();
        
        if (orderError || !orderData) {
          throw new Error('Nie znaleziono ankiety lub link jest nieprawidłowy');
        }
        
        console.log('Found order with ID:', orderData.id);
        setPartnerOrderId(orderData.id);
        setOrderFetched(true);
        
        // Use the pre-saved question sequence if available
        if (orderData.user_question_sequence && 
            Array.isArray(orderData.user_question_sequence) && 
            orderData.user_question_sequence.length > 0) {
          console.log('Using pre-saved question sequence from order:', orderData.user_question_sequence);
          setSelectedQuestionIds(orderData.user_question_sequence);
          setDataFetched(true);
          toast.success('Ankieta załadowana pomyślnie');
        } else {
          console.log('No pre-saved question sequence in order, fetching from user responses');
          setError('Brak sekwencji pytań zamawiającego. Proszę skontaktować się z osobą, która wysłała Ci link.');
          setDataFetched(true); // Prevent infinite retries
        }
      } catch (err: any) {
        console.error('Error in fetchOrderData:', err);
        setError(err.message || 'Wystąpił błąd podczas ładowania ankiety');
        // Mark as fetched to prevent infinite retries
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
