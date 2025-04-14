
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
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

// Stałe dla localStorage
const LOCAL_STORAGE_KEY = 'survey_answers_autosave';
const LOCAL_STORAGE_QUESTION_INDEX_KEY = 'survey_question_index_autosave';
const LOCAL_STORAGE_CONFIG_KEY = 'survey_config_autosave';
const LOCAL_STORAGE_CONFIG_COMPLETED_KEY = 'survey_config_completed';

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const partnerToken = searchParams.get('token');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [questions] = useState<Question[]>(questionsDatabase);
  const [showInstructions, setShowInstructions] = useState<boolean>(!partnerToken);
  const [surveyConfig, setSurveyConfig] = useState<SurveyConfig>({
    userGender: null,
    partnerGender: null,
    gameLevel: null,
    isConfigComplete: false
  });

  // Get partner survey data from the hook
  const { partnerOrderId, selectedQuestionIds, error, isLoading } = usePartnerSurveyData(partnerToken);
  
  // Get filtered questions based on config
  const filteredQuestions = useQuestionSelection(
    questions,
    surveyConfig,
    selectedQuestionIds,
    !!partnerToken
  );

  // Przywracanie zapisanych danych z localStorage przy pierwszym renderowaniu
  useEffect(() => {
    // Nie przywracaj danych dla ankiety partnera
    if (partnerToken) return;
    
    try {
      // Sprawdź czy ankieta była wcześniej zakończona
      const configCompleted = localStorage.getItem(LOCAL_STORAGE_CONFIG_COMPLETED_KEY) === 'true';
      
      // Przywracanie konfiguracji ankiety
      const savedConfig = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig) as SurveyConfig;
        setSurveyConfig(parsedConfig);
        console.log('Przywrócono konfigurację ankiety z localStorage:', parsedConfig);
        
        // Jeśli konfiguracja była zakończona, ustaw również flagę isConfigComplete
        if (configCompleted) {
          setShowInstructions(false);
        }
      }
      
      // Przywracanie odpowiedzi
      const savedAnswers = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers) as Record<string, number>;
        setAnswers(parsedAnswers);
        console.log('Przywrócono odpowiedzi z localStorage:', parsedAnswers);
      }
      
      // Przywracanie indeksu pytania tylko jeśli konfiguracja była zakończona
      if (configCompleted) {
        const savedQuestionIndex = localStorage.getItem(LOCAL_STORAGE_QUESTION_INDEX_KEY);
        if (savedQuestionIndex) {
          const parsedIndex = parseInt(savedQuestionIndex);
          if (!isNaN(parsedIndex)) {
            setCurrentQuestionIndex(parsedIndex);
            console.log('Przywrócono indeks pytania z localStorage:', parsedIndex);
            
            // Pokaż powiadomienie o przywróceniu sesji
            if (Object.keys(JSON.parse(savedAnswers || '{}')).length > 0) {
              setTimeout(() => {
                toast.info('Przywrócono Twoją poprzednią sesję ankiety', {
                  description: 'Możesz kontynuować od miejsca, w którym przerwałeś/aś',
                  duration: 5000,
                });
              }, 1000);
            }
          }
        }
      }
    } catch (error) {
      console.error('Błąd podczas przywracania danych z localStorage:', error);
      // W razie błędu, wyczyść localStorage
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_QUESTION_INDEX_KEY);
      localStorage.removeItem(LOCAL_STORAGE_CONFIG_KEY);
      localStorage.removeItem(LOCAL_STORAGE_CONFIG_COMPLETED_KEY);
    }
  }, [partnerToken]);

  // Zapisuj konfigurację ankiety do localStorage przy jej zmianie
  useEffect(() => {
    if (!partnerToken) {
      localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(surveyConfig));
      
      // Zapisz również informację o tym, czy konfiguracja została zakończona
      if (surveyConfig.isConfigComplete) {
        localStorage.setItem(LOCAL_STORAGE_CONFIG_COMPLETED_KEY, 'true');
      }
      
      console.log('Zapisano konfigurację ankiety do localStorage:', surveyConfig);
    }
  }, [surveyConfig, partnerToken]);

  // Zapisuj odpowiedzi do localStorage przy ich zmianie
  useEffect(() => {
    if (!partnerToken && Object.keys(answers).length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(answers));
      console.log('Zapisano odpowiedzi do localStorage:', answers);
    }
  }, [answers, partnerToken]);

  // Zapisuj indeks pytania do localStorage przy jego zmianie
  useEffect(() => {
    if (!partnerToken && surveyConfig.isConfigComplete) {
      localStorage.setItem(LOCAL_STORAGE_QUESTION_INDEX_KEY, currentQuestionIndex.toString());
      console.log('Zapisano indeks pytania do localStorage:', currentQuestionIndex);
    }
  }, [currentQuestionIndex, partnerToken, surveyConfig.isConfigComplete]);

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
    setShowInstructions(!partnerToken);
    setSurveyConfig({
      userGender: null,
      partnerGender: null,
      gameLevel: null,
      isConfigComplete: false
    });
    
    // Wyczyść localStorage przy resetowaniu ankiety
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_QUESTION_INDEX_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CONFIG_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CONFIG_COMPLETED_KEY);
  }, [partnerToken]);

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
    // Zapisujemy informację, że konfiguracja została zakończona
    localStorage.setItem(LOCAL_STORAGE_CONFIG_COMPLETED_KEY, 'true');
  }, []);

  const completeInstructions = useCallback(() => {
    setShowInstructions(false);
  }, []);

  const value = {
    currentQuestionIndex,
    setCurrentQuestionIndex,
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
    showInstructions,
    completeInstructions,
    isPartnerSurvey: !!partnerToken,
    filteredQuestions,
    saveAnswer,
    setOrderId: (orderId: string) => {
      // This is just a stub since partnerOrderId is now managed by the hook
      console.log('Order ID set:', orderId);
      return orderId;
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
