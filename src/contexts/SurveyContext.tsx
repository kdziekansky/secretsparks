
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { questionsDatabase } from './questions-data';
import { toast } from 'sonner';
import { usePartnerSurveyData } from '@/hooks/usePartnerSurveyData';
import { useQuestionSelection } from '@/hooks/useQuestionSelection';
import type { 
  SurveyContextType, 
  Question, 
  SurveyConfig, 
  Gender, 
  GameLevel 
} from '@/types/survey';

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const partnerToken = searchParams.get('token');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [questions] = useState<Question[]>(questionsDatabase);
  const [surveyConfig, setSurveyConfig] = useState<SurveyConfig>({
    userGender: null,
    partnerGender: null,
    gameLevel: null,
    isConfigComplete: false
  });

  const { partnerOrderId, selectedQuestionIds, error, isLoading } = usePartnerSurveyData(partnerToken);
  
  const filteredQuestions = useQuestionSelection(
    questions,
    surveyConfig,
    selectedQuestionIds,
    !!partnerToken
  );

  const totalQuestions = filteredQuestions.length;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const currentQuestion = filteredQuestions[currentQuestionIndex] || null;
  
  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return ((currentQuestionIndex) / (totalQuestions - 1)) * 100;
  }, [currentQuestionIndex, totalQuestions]);

  const setAnswer = useCallback((questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Auto-save answer for partner surveys
    if (partnerToken && partnerOrderId) {
      const saveToDatabase = async () => {
        try {
          // Check for existing answer first
          const { data: existingData } = await supabase
            .from('survey_responses')
            .select('id')
            .eq('order_id', partnerOrderId)
            .eq('question_id', questionId)
            .eq('user_type', 'partner')
            .single();
          
          if (existingData) {
            // Update existing answer
            const { error } = await supabase
              .from('survey_responses')
              .update({ answer: value })
              .eq('id', existingData.id);
              
            if (error) console.error('Error updating partner response:', error);
          } else {
            // Insert new answer
            const { error } = await supabase
              .from('survey_responses')
              .insert({
                order_id: partnerOrderId,
                question_id: questionId,
                answer: value,
                user_type: 'partner',
                user_gender: surveyConfig.userGender,
                partner_gender: surveyConfig.partnerGender,
                game_level: surveyConfig.gameLevel
              });
              
            if (error) console.error('Error saving partner response:', error);
          }
        } catch (err) {
          console.error('Failed to save partner response:', err);
        }
      };
      
      saveToDatabase();
    }
  }, [partnerToken, partnerOrderId, surveyConfig]);

  const saveAnswer = useCallback(async (isPartnerSurvey = false) => {
    if (!currentQuestion) return;
    
    try {
      // Only save if we have a value for the current question
      const answerValue = answers[currentQuestion.id];
      if (answerValue === undefined) return;
      
      if (isPartnerSurvey && partnerOrderId) {
        console.log('Saving partner answer for question', currentQuestion.id, 'with value', answerValue);
        
        // First check if this answer already exists to prevent duplicates
        const { data: existingData, error: checkError } = await supabase
          .from('survey_responses')
          .select('id')
          .eq('order_id', partnerOrderId)
          .eq('question_id', currentQuestion.id)
          .eq('user_type', 'partner');
          
        if (checkError) {
          console.error('Error checking for existing responses:', checkError);
        }
        
        // If answer already exists, update it instead of inserting
        if (existingData && existingData.length > 0) {
          console.log('Updating existing answer for question', currentQuestion.id);
          const { error: updateError } = await supabase
            .from('survey_responses')
            .update({ answer: answerValue })
            .eq('id', existingData[0].id);
            
          if (updateError) {
            console.error('Error updating partner response:', updateError);
          } else {
            console.log('Successfully updated partner response');
          }
        } else {
          // Insert new answer
          const { error: saveError } = await supabase
            .from('survey_responses')
            .insert({
              order_id: partnerOrderId,
              question_id: currentQuestion.id,
              answer: answerValue,
              user_type: 'partner',
              user_gender: surveyConfig.userGender,
              partner_gender: surveyConfig.partnerGender,
              game_level: surveyConfig.gameLevel
            });
            
          if (saveError) {
            console.error('Error saving partner response:', saveError);
          } else {
            console.log('Successfully saved partner response');
          }
        }
      }
      // The regular user response saving is handled in the payment process
    } catch (error) {
      console.error('Error in saveAnswer:', error);
    }
  }, [currentQuestion, answers, partnerOrderId, surveyConfig]);

  const nextQuestion = useCallback(() => {
    const currentQ = filteredQuestions[currentQuestionIndex];
    if (!currentQ || answers[currentQ.id] === undefined) {
      return;
    }
    
    if (partnerToken) {
      saveAnswer(true);
    }
    
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, filteredQuestions, answers, partnerToken, saveAnswer]);

  const prevQuestion = useCallback(() => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [isFirstQuestion]);
  
  const resetSurvey = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSurveyConfig({
      userGender: null,
      partnerGender: null,
      gameLevel: null,
      isConfigComplete: false
    });
  }, []);

  const setUserGender = useCallback((gender: Gender) => {
    setSurveyConfig(prev => ({ ...prev, userGender: gender }));
  }, []);

  const setPartnerGender = useCallback((gender: Gender) => {
    setSurveyConfig(prev => ({ ...prev, partnerGender: gender }));
  }, []);

  const setGameLevel = useCallback((level: GameLevel) => {
    setSurveyConfig(prev => ({ ...prev, gameLevel: level }));
  }, []);

  const completeConfig = useCallback(() => {    
    setSurveyConfig(prev => ({ ...prev, isConfigComplete: true }));
    setCurrentQuestionIndex(0);
    
    // No need for setSelectedQuestionIds as it's now handled by the hook
  }, []);

  const value = {
    currentQuestionIndex,
    answers,
    questions,
    surveyConfig,
    totalQuestions,
    setAnswer,
    nextQuestion,
    prevQuestion,
    isFirstQuestion,
    isLastQuestion,
    currentQuestion,
    progress,
    resetSurvey,
    setUserGender,
    setPartnerGender,
    setGameLevel,
    completeConfig,
    isInConfigurationMode: !surveyConfig.isConfigComplete,
    filteredQuestions,
    saveAnswer,
    setOrderId: (orderId: string) => {
      // This is now just a stub since partnerOrderId is managed by the hook
      return partnerOrderId;
    },
    getOrderId: () => partnerOrderId,
  };

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};

export const useSurvey = (): SurveyContextType => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};

export type { Gender, GameLevel };
