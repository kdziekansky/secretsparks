
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePartnerSurveyData = (partnerToken: string | null) => {
  const [partnerOrderId, setPartnerOrderId] = useState<string | null>(null);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch order question sequence for partners
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
        
        // After finding the order, fetch the exact sequence of questions that the user answered
        await fetchOrderQuestionSequence(orderData.id);
        
      } catch (err: any) {
        console.error('Error in fetchOrderData:', err);
        setError(err.message || 'Wystąpił błąd podczas ładowania ankiety');
      } finally {
        setIsLoading(false);
      }
    };

    // Separate function to fetch question sequence
    const fetchOrderQuestionSequence = async (orderId: string) => {
      try {
        console.log('Fetching question sequence for order:', orderId);
        
        // IMPROVED: Fetch user responses to get the exact sequence of questions
        const { data, error } = await supabase
          .from('survey_responses')
          .select('question_id, created_at')
          .eq('order_id', orderId)
          .eq('user_type', 'user')  // Get original user's responses
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error('Error fetching question sequence:', error);
          return;
        }
        
        if (data && data.length > 0) {
          // Extract unique question IDs in the order they were answered
          const seenIds = new Set<string>();
          const questionIds = data
            .map(response => response.question_id)
            .filter(id => {
              if (seenIds.has(id)) return false;
              seenIds.add(id);
              return true;
            });
            
          console.log('Fetched question sequence from user responses:', questionIds);
          setSelectedQuestionIds(questionIds);
          toast.success('Ankieta załadowana pomyślnie');
        } else {
          console.log('No existing question sequence found for this order');
          setSelectedQuestionIds([]);
          setError('Nie znaleziono odpowiedzi zamawiającego, ankieta partnera może nie być identyczna');
        }
      } catch (err) {
        console.error('Failed to fetch question sequence:', err);
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
