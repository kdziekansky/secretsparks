
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
          .select('id, user_gender, partner_gender, game_level')
          .eq('partner_survey_token', partnerToken)
          .single();
        
        if (orderError || !orderData) {
          throw new Error('Nie znaleziono ankiety lub link jest nieprawidłowy');
        }
        
        console.log('Found order with ID:', orderData.id);
        setPartnerOrderId(orderData.id);
        setOrderFetched(true);
        
        // DIRECTLY query the survey_responses table to get the user's responses
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
        
        // If there are user responses, use them to create the question sequence
        if (userResponses && userResponses.length > 0) {
          // Extract question IDs in order they were answered
          const questionIds = userResponses.map(response => response.question_id);
          console.log(`Found ${questionIds.length} questions from user responses:`, questionIds);
          
          setSelectedQuestionIds(questionIds);
          setDataFetched(true);
          toast.success('Ankieta załadowana pomyślnie');
          setIsLoading(false);
          return;
        }
        
        // FALLBACK - If we reach here and there are no user responses, generate a default sequence
        // This ensures the partner survey still works even if the user hasn't completed their part
        console.log('No user responses found for this order, generating default question sequence');
        
        // Generate a set of default questions based on the order's configuration
        const defaultQuestions = generateDefaultQuestions(
          orderData.user_gender, 
          orderData.partner_gender, 
          orderData.game_level
        );
        
        if (defaultQuestions.length > 0) {
          console.log(`Generated ${defaultQuestions.length} default questions for partner`);
          setSelectedQuestionIds(defaultQuestions);
          setDataFetched(true);
          toast.success('Ankieta załadowana pomyślnie');
          setIsLoading(false);
          return;
        }
        
        // If we still can't get questions, throw an error
        throw new Error('Nie udało się wygenerować pytań. Skontaktuj się z administratorem.');
        
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

  // Function to generate a default set of questions based on order configuration
  const generateDefaultQuestions = (
    userGender: string | null, 
    partnerGender: string | null, 
    gameLevel: string | null
  ): string[] => {
    // Use a subset of the questions database based on the order configuration
    const filteredQuestions = questionsDatabase.filter(question => {
      // Skip questions with specific configurations that don't match
      if (question.forConfig) {
        const { userGender: qUserGender, partnerGender: qPartnerGender, gameLevel: qGameLevel } = question.forConfig;
        
        if (qUserGender && userGender && qUserGender !== userGender) return false;
        if (qPartnerGender && partnerGender && qPartnerGender !== partnerGender) return false;
        if (qGameLevel && gameLevel && !qGameLevel.includes(gameLevel as any)) return false;
      }
      
      return true;
    });
    
    // Shuffle the filtered questions and take up to 15
    const shuffled = [...filteredQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 15);
    
    // Return just the question IDs
    return shuffled.map(q => q.id);
  };

  return {
    partnerOrderId,
    selectedQuestionIds,
    error,
    isLoading,
    dataFetched
  };
};
