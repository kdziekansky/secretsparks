
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Question } from '@/types/survey';

export const usePartnerSurveyData = (partnerToken: string | null) => {
  const [partnerOrderId, setPartnerOrderId] = useState<string | null>(null);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch order question sequence for partners
  const fetchOrderQuestionSequence = async (orderId: string) => {
    try {
      console.log('Fetching question sequence for order:', orderId);
      
      // Fetch responses to get the sequence
      const { data, error } = await supabase
        .from('survey_responses')
        .select('question_id, created_at')
        .eq('order_id', orderId)
        .eq('user_type', 'user')  // Only user's responses
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching question sequence:', error);
        return;
      }
      
      if (data && data.length > 0) {
        const questionIds = data.map(response => response.question_id);
        console.log('Fetched question sequence:', questionIds);
        setSelectedQuestionIds(questionIds);
      } else {
        console.log('No existing question sequence found for this order');
      }
    } catch (err) {
      console.error('Failed to fetch question sequence:', err);
    }
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!partnerToken) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Fetching order details for partner token:', partnerToken);
        
        // Get the order associated with this partner token
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('id, user_gender, partner_gender, game_level')
          .eq('partner_survey_token', partnerToken)
          .single();
        
        if (orderError || !orderData) {
          throw new Error('Nie znaleziono ankiety lub link jest nieprawidłowy');
        }
        
        console.log('Found order with ID:', orderData.id);
        setPartnerOrderId(orderData.id);
        
        // Fetch questions sequence for this order
        await fetchOrderQuestionSequence(orderData.id);
        toast.success('Ankieta załadowana pomyślnie');
        
      } catch (err: any) {
        console.error('Error in fetchOrderData:', err);
        setError(err.message || 'Wystąpił błąd podczas ładowania ankiety');
      } finally {
        setIsLoading(false);
      }
    };

    if (partnerToken) {
      fetchOrderData();
    }
  }, [partnerToken]);

  return {
    partnerOrderId,
    selectedQuestionIds,
    error,
    isLoading
  };
};
