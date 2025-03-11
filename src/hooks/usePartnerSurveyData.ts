
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
          await fetchOrderQuestionSequence(orderData.id);
        }
      } catch (err: any) {
        console.error('Error in fetchOrderData:', err);
        setError(err.message || 'Wystąpił błąd podczas ładowania ankiety');
        // Mark as fetched to prevent infinite retries
        setOrderFetched(true);
      } finally {
        setIsLoading(false);
      }
    };

    // Separate function to fetch question sequence from responses
    const fetchOrderQuestionSequence = async (orderId: string) => {
      try {
        console.log('Fetching question sequence for order:', orderId);
        
        const { data, error } = await supabase
          .from('survey_responses')
          .select('question_id, created_at')
          .eq('order_id', orderId)
          .eq('user_type', 'user')
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error('Error fetching question sequence:', error);
          return;
        }
        
        if (data && data.length > 0) {
          // Extract question IDs in the exact order they were answered
          const questionIds = data.map(response => response.question_id);
          
          console.log('Fetched question sequence from user responses:', questionIds);
          
          // Save sequence back to order for future use if it's not already there
          try {
            await supabase
              .from('orders')
              .update({ user_question_sequence: questionIds })
              .eq('id', orderId);
            console.log('Saved question sequence back to order for future use');
          } catch (updateError) {
            console.error('Failed to update order with question sequence:', updateError);
          }
          
          setSelectedQuestionIds(questionIds);
          setDataFetched(true);
          toast.success('Ankieta załadowana pomyślnie');
        } else {
          console.log('No existing question sequence found for this order');
          setSelectedQuestionIds([]);
          setDataFetched(true); // Mark as fetched even if empty to prevent refetching
          setError('Nie znaleziono odpowiedzi zamawiającego, ankieta partnera może nie być identyczna');
        }
      } catch (err) {
        console.error('Failed to fetch question sequence:', err);
        setDataFetched(true); // Mark as fetched even on error to prevent refetching
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
