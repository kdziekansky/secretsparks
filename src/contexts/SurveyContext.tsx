
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Questions } from './questions-data';
import { Question, SurveyConfig, SurveyContextType, Gender, GameLevel } from '@/types/survey';
import { useQuestionSelection } from '@/hooks/useQuestionSelection';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Inicjalizacja domyślnej konfiguracji ankiety
const defaultConfig: SurveyConfig = {
  userGender: null,
  partnerGender: null,
  gameLevel: null,
  isConfigComplete: false,
};

// Utworzenie kontekstu z domyślnymi wartościami
const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  
  // Stan główny ankiety
  const [surveyConfig, setSurveyConfig] = useState<SurveyConfig>(() => {
    // Próba załadowania zapisanej konfiguracji z localStorage
    const savedConfig = localStorage.getItem('survey_config_autosave');
    return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    // Próba załadowania zapisanych odpowiedzi z localStorage
    const savedAnswers = localStorage.getItem('survey_answers_autosave');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  
  const [isInConfigurationMode, setIsInConfigurationMode] = useState<boolean>(() => {
    if (surveyConfig.isConfigComplete) {
      return false;
    }
    const configCompleted = localStorage.getItem('survey_config_completed');
    return configCompleted !== 'true';
  });
  
  const [showInstructions, setShowInstructions] = useState<boolean>(() => {
    const instructionsShown = localStorage.getItem('survey_instructions_shown');
    return instructionsShown !== 'true';
  });
  
  const [orderId, setOrderIdState] = useState<string | null>(() => {
    const savedOrderId = localStorage.getItem('survey_order_id');
    return savedOrderId || null;
  });
  
  const [questions, setQuestions] = useState<Question[]>(Questions);
  const [isPartnerSurvey, setIsPartnerSurvey] = useState<boolean>(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  
  // Użycie hooka do wyboru pytań na podstawie konfiguracji
  const filteredQuestions = useQuestionSelection(
    questions,
    surveyConfig,
    selectedQuestionIds,
    isPartnerSurvey
  );
  
  // Pobieranie pytań partnera z bazy danych jeśli to ankieta partnera
  useEffect(() => {
    const fetchPartnerQuestionSequence = async () => {
      if (!isPartnerSurvey || !orderId || selectedQuestionIds.length > 0) return;
      
      try {
        console.log('Pobieranie sekwencji pytań dla partnera, orderId:', orderId);
        
        // Pobieranie sekwencji pytań użytkownika z tabeli orders
        const { data, error } = await supabase
          .from('orders')
          .select('user_question_sequence')
          .eq('id', orderId)
          .single();
          
        if (error) {
          throw new Error(`Błąd podczas pobierania sekwencji pytań: ${error.message}`);
        }
        
        if (data && data.user_question_sequence && Array.isArray(data.user_question_sequence)) {
          console.log('Pobrano sekwencję pytań:', data.user_question_sequence);
          setSelectedQuestionIds(data.user_question_sequence);
        } else {
          console.warn('Nie znaleziono sekwencji pytań dla partnera lub dane są nieprawidłowe:', data);
        }
      } catch (err) {
        console.error('Błąd podczas pobierania sekwencji pytań partnera:', err);
      }
    };
    
    fetchPartnerQuestionSequence();
  }, [isPartnerSurvey, orderId]);
  
  // Zapisywanie konfiguracji i odpowiedzi do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('survey_config_autosave', JSON.stringify(surveyConfig));
    
    // Ustawianie flagi ukończenia konfiguracji
    if (surveyConfig.isConfigComplete) {
      localStorage.setItem('survey_config_completed', 'true');
    }
  }, [surveyConfig]);
  
  useEffect(() => {
    localStorage.setItem('survey_answers_autosave', JSON.stringify(answers));
  }, [answers]);
  
  // Zapisywanie orderId do localStorage
  useEffect(() => {
    if (orderId) {
      localStorage.setItem('survey_order_id', orderId);
    }
  }, [orderId]);
  
  // Zapisywanie statusu instrukcji
  useEffect(() => {
    if (!showInstructions) {
      localStorage.setItem('survey_instructions_shown', 'true');
    }
  }, [showInstructions]);
  
  // Po załadowaniu wszystkich pytań, próbujemy zapisać identyfikatory w kolejności do bazy danych
  useEffect(() => {
    const saveUserQuestionSequence = async () => {
      // Zapisujemy tylko gdy:
      // 1. Nie jest to ankieta partnera
      // 2. Mamy orderId
      // 3. Mamy co najmniej jedno pytanie
      // 4. Konfiguracja jest ukończona
      
      if (isPartnerSurvey || !orderId || filteredQuestions.length === 0 || !surveyConfig.isConfigComplete) {
        return;
      }
      
      try {
        // Zapisujemy tylko identyfikatory pytań
        const questionIds = filteredQuestions.map(q => q.id);
        console.log('Zapisywanie sekwencji pytań dla użytkownika:', questionIds);
        
        const { error } = await supabase
          .from('orders')
          .update({ user_question_sequence: questionIds })
          .eq('id', orderId);
          
        if (error) {
          console.error('Błąd podczas zapisywania sekwencji pytań:', error);
        } else {
          console.log('Pomyślnie zapisano sekwencję pytań dla użytkownika');
        }
      } catch (err) {
        console.error('Nieoczekiwany błąd podczas zapisywania sekwencji pytań:', err);
      }
    };
    
    saveUserQuestionSequence();
  }, [orderId, filteredQuestions, isPartnerSurvey, surveyConfig.isConfigComplete]);
  
  // Resetowanie ankiety
  const resetSurvey = () => {
    // Resetowanie stanu
    setSurveyConfig(defaultConfig);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsInConfigurationMode(true);
    
    // Czyszczenie localStorage
    localStorage.removeItem('survey_config_autosave');
    localStorage.removeItem('survey_answers_autosave');
    localStorage.removeItem('survey_config_completed');
    
    // Zachowujemy orderId i status instrukcji
    console.log('Ankieta zresetowana');
  };
  
  // Ustawienie pojedynczej odpowiedzi
  const setAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  // Zapisanie odpowiedzi do bazy danych
  const saveAnswer = async (isPartnerSurvey = false): Promise<void> => {
    if (!orderId) {
      console.error("Brak orderId, nie można zapisać odpowiedzi");
      return Promise.reject(new Error("Brak orderId"));
    }
    
    try {
      // Przygotowanie danych do zapisu
      const answerData = isPartnerSurvey ? 
        { partner_survey_answers: answers } : 
        { user_survey_answers: answers };
      
      console.log(`Zapisywanie odpowiedzi dla ${isPartnerSurvey ? 'partnera' : 'użytkownika'}:`, answerData);
      
      const { error } = await supabase
        .from('orders')
        .update(answerData)
        .eq('id', orderId);
      
      if (error) {
        throw new Error(`Błąd podczas zapisywania odpowiedzi: ${error.message}`);
      }
      
      console.log("Odpowiedzi zapisane pomyślnie");
      return Promise.resolve();
    } catch (err) {
      console.error("Błąd podczas zapisywania odpowiedzi:", err);
      return Promise.reject(err);
    }
  };
  
  // Przejście do następnego pytania
  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  // Powrót do poprzedniego pytania
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  // Aktualnie wyświetlane pytanie
  const currentQuestion = filteredQuestions.length > 0 ? 
    filteredQuestions[currentQuestionIndex] : null;
  
  // Flagi stanu pytań
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === filteredQuestions.length - 1;
  
  // Obliczanie postępu ankiety
  const progress = filteredQuestions.length > 0 ? 
    ((currentQuestionIndex + 1) / filteredQuestions.length) * 100 : 0;
  
  // Settery dla konfiguracji
  const setUserGender = (gender: Gender) => {
    setSurveyConfig(prev => ({ ...prev, userGender: gender }));
  };
  
  const setPartnerGender = (gender: Gender) => {
    setSurveyConfig(prev => ({ ...prev, partnerGender: gender }));
  };
  
  const setGameLevel = (level: GameLevel) => {
    setSurveyConfig(prev => ({ ...prev, gameLevel: level }));
  };
  
  // Zakończenie etapu konfiguracji
  const completeConfig = () => {
    setSurveyConfig(prev => ({ ...prev, isConfigComplete: true }));
    setIsInConfigurationMode(false);
  };
  
  // Zakończenie etapu instrukcji
  const completeInstructions = () => {
    setShowInstructions(false);
  };
  
  // Ustawienie ID zamówienia
  const setOrderId = (id: string) => {
    setOrderIdState(id);
  };
  
  // Pobranie ID zamówienia
  const getOrderId = () => orderId;
  
  // Kontekst udostępniany komponentom
  const value: SurveyContextType = {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswer,
    questions,
    surveyConfig,
    totalQuestions: filteredQuestions.length,
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
    isInConfigurationMode,
    showInstructions,
    completeInstructions,
    isPartnerSurvey,
    filteredQuestions,
    saveAnswer,
    setOrderId,
    getOrderId
  };
  
  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
};

// Hook do używania kontekstu ankiety
export const useSurvey = (): SurveyContextType => {
  const context = useContext(SurveyContext);
  
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  
  return context;
};
