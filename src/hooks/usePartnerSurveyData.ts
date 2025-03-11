
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { questionsDatabase } from '@/contexts/questions-data';

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
        
        // PRIORITY 1: Use the sequence saved in the order itself
        if (orderData.user_question_sequence && 
            Array.isArray(orderData.user_question_sequence) && 
            orderData.user_question_sequence.length > 0) {
          
          console.log('Using pre-saved question sequence from order:', orderData.user_question_sequence);
          setSelectedQuestionIds(orderData.user_question_sequence);
          setDataFetched(true);
          toast.success('Ankieta załadowana pomyślnie');
          setIsLoading(false);
          return;
        }
        
        console.log('No pre-saved question sequence in order, fetching from user responses');
          
        // PRIORITY 2: If no sequence is stored in the order, get it from the user's responses
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
        
        // Jeśli nie ma odpowiedzi od zamawiającego, generujemy zestaw pytań na podstawie konfiguracji
        if (!userResponses || userResponses.length === 0) {
          console.log('No user responses found for this order, generating default question set');
          
          // Wygeneruj standardowy zestaw pytań na podstawie konfiguracji zamówienia
          const config = {
            userGender: orderData.user_gender || 'male',
            partnerGender: orderData.partner_gender || 'male',
            gameLevel: orderData.game_level || 'discover',
            isConfigComplete: true
          };
          
          // Wybierz 15 randomowych pytań (taka sama logika jak w useQuestionSelection)
          const filteredQuestions = questionsDatabase.filter(question => {
            if (!question.forConfig) return true;
            
            const { userGender, partnerGender, gameLevel } = question.forConfig;
            
            if (userGender && userGender !== config.userGender) return false;
            if (partnerGender && partnerGender !== config.partnerGender) return false;
            if (gameLevel && !gameLevel.includes(config.gameLevel as any)) return false;
            
            return true;
          });
          
          // Wybierz pierwsze 15 pytań - bez randomizacji, żeby zawsze były takie same
          const defaultQuestionsIds = filteredQuestions.slice(0, 15).map(q => q.id);
          console.log(`Generated default set of ${defaultQuestionsIds.length} questions:`, defaultQuestionsIds);
          
          // Zapisz te pytania do zamówienia
          const { error: updateError } = await supabase
            .from('orders')
            .update({ user_question_sequence: defaultQuestionsIds })
            .eq('id', orderData.id);
            
          if (updateError) {
            console.error('Failed to save question sequence to order:', updateError);
          } else {
            console.log('Successfully saved default question sequence to order');
          }
          
          setSelectedQuestionIds(defaultQuestionsIds);
          setDataFetched(true);
          toast.success('Ankieta załadowana pomyślnie');
          return;
        }
        
        // Extract question IDs in order they were answered
        const questionIds = userResponses.map(response => response.question_id);
        console.log(`Found ${questionIds.length} questions from user responses:`, questionIds);
        
        // Save the question sequence to the order for future reference
        const { error: updateError } = await supabase
          .from('orders')
          .update({ user_question_sequence: questionIds })
          .eq('id', orderData.id);
        
        if (updateError) {
          console.error('Failed to save question sequence to order:', updateError);
        } else {
          console.log('Successfully saved question sequence to order');
        }
        
        setSelectedQuestionIds(questionIds);
        setDataFetched(true);
        toast.success('Ankieta załadowana pomyślnie');
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
