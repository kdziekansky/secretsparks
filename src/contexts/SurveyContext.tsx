import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { questions as questionsData } from './questions-data';
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
    try {
      const savedConfig = localStorage.getItem('survey_config_autosave');
      return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
    } catch (e) {
      console.error('Błąd podczas odczytu konfiguracji z localStorage:', e);
      return defaultConfig;
    }
  });
  
  // Zapamiętujemy pozycję ostatniego pytania
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    try {
      const savedIndex = localStorage.getItem('survey_current_question_index');
      return savedIndex ? parseInt(savedIndex, 10) : 0;
    } catch (e) {
      console.error('Błąd podczas odczytu indeksu pytania z localStorage:', e);
      return 0;
    }
  });

  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    // Próba załadowania zapisanych odpowiedzi z localStorage
    try {
      const savedAnswers = localStorage.getItem('survey_answers_autosave');
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    } catch (e) {
      console.error('Błąd podczas odczytu odpowiedzi z localStorage:', e);
      return {};
    }
  });
  
  // Stan przechowujący identyfikatory zapamiętanych pytań
  const [savedQuestionIds, setSavedQuestionIds] = useState<string[]>(() => {
    try {
      const savedIds = localStorage.getItem('survey_question_ids_autosave');
      return savedIds ? JSON.parse(savedIds) : [];
    } catch (e) {
      console.error('Błąd podczas odczytu identyfikatorów pytań z localStorage:', e);
      return [];
    }
  });
  
  const [isInConfigurationMode, setIsInConfigurationMode] = useState<boolean>(() => {
    if (surveyConfig.isConfigComplete) {
      return false;
    }
    
    try {
      const configCompleted = localStorage.getItem('survey_config_completed');
      return configCompleted !== 'true';
    } catch (e) {
      console.error('Błąd podczas odczytu stanu konfiguracji z localStorage:', e);
      return true;
    }
  });
  
  const [showInstructions, setShowInstructions] = useState<boolean>(() => {
    try {
      const instructionsShown = localStorage.getItem('survey_instructions_shown');
      return instructionsShown !== 'true';
    } catch (e) {
      console.error('Błąd podczas odczytu stanu instrukcji z localStorage:', e);
      return true;
    }
  });
  
  const [orderId, setOrderIdState] = useState<string | null>(() => {
    try {
      const savedOrderId = localStorage.getItem('survey_order_id');
      return savedOrderId || null;
    } catch (e) {
      console.error('Błąd podczas odczytu orderId z localStorage:', e);
      return null;
    }
  });
  
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  const [isPartnerSurvey, setIsPartnerSurvey] = useState<boolean>(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  
  // ZMODYFIKOWANE: Dodajemy sprawdzenie kompletności konfiguracji
  // Konfiguracja jest kompletna tylko gdy wszystkie pola są ustawione
  useEffect(() => {
    if (surveyConfig.isConfigComplete && 
        (!surveyConfig.userGender || !surveyConfig.partnerGender || !surveyConfig.gameLevel)) {
      console.log('Wykryto niekompletną konfigurację oznaczoną jako kompletna, wymuszanie powrotu do konfiguracji');
      setIsInConfigurationMode(true);
      toast.error('Konfiguracja jest niekompletna. Uzupełnij wszystkie pola.');
    }
  }, [surveyConfig]);
  
  // Użycie hooka do wyboru pytań na podstawie konfiguracji
  const filteredQuestions = useQuestionSelection(
    questions,
    surveyConfig,
    // Używamy zapisanych ID pytań, jeśli istnieją i konfiguracja jest ukończona
    surveyConfig.isConfigComplete && savedQuestionIds.length > 0 ? savedQuestionIds : selectedQuestionIds,
    isPartnerSurvey
  );
  
  // Zapisujemy identyfikatory pytań po ich wygenerowaniu
  useEffect(() => {
    if (filteredQuestions.length > 0 && surveyConfig.isConfigComplete && !isPartnerSurvey) {
      const newQuestionIds = filteredQuestions.map(q => q.id);
      
      // Porównanie aktualnych ID z zapisanymi
      const currentIds = JSON.stringify(newQuestionIds);
      const savedIds = JSON.stringify(savedQuestionIds);
      
      // Zapisujemy tylko jeśli są różne lub nie ma zapisanych
      if (savedIds !== currentIds && savedQuestionIds.length === 0) {
        console.log('Zapisywanie zestawu pytań do localStorage:', newQuestionIds);
        try {
          localStorage.setItem('survey_question_ids_autosave', JSON.stringify(newQuestionIds));
          setSavedQuestionIds(newQuestionIds);
        } catch (e) {
          console.error('Błąd podczas zapisywania zestawu pytań do localStorage:', e);
        }
      }
    }
  }, [filteredQuestions, surveyConfig.isConfigComplete, isPartnerSurvey]);
  
  // Zapisujemy currentQuestionIndex do localStorage
  useEffect(() => {
    try {
      localStorage.setItem('survey_current_question_index', currentQuestionIndex.toString());
      console.log(`Zapisano indeks bieżącego pytania (${currentQuestionIndex}) do localStorage`);
    } catch (e) {
      console.error('Błąd podczas zapisywania indeksu bieżącego pytania do localStorage:', e);
    }
  }, [currentQuestionIndex]);
  
  // ZMODYFIKOWANE: Dodajemy efekt monitorujący brak pytań
  useEffect(() => {
    if (surveyConfig.isConfigComplete && !isInConfigurationMode && filteredQuestions.length === 0 && !isPartnerSurvey) {
      console.log('Wykryto brak pytań po zakończonej konfiguracji. Wymuszanie powrotu do konfiguracji.');
      setIsInConfigurationMode(true);
    }
  }, [filteredQuestions, surveyConfig.isConfigComplete, isInConfigurationMode, isPartnerSurvey]);
  
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
    try {
      localStorage.setItem('survey_config_autosave', JSON.stringify(surveyConfig));
      
      // Ustawianie flagi ukończenia konfiguracji
      if (surveyConfig.isConfigComplete) {
        localStorage.setItem('survey_config_completed', 'true');
      }
      
      console.log('Zapisano konfigurację do localStorage:', surveyConfig);
    } catch (e) {
      console.error('Błąd podczas zapisywania konfiguracji do localStorage:', e);
    }
  }, [surveyConfig]);
  
  useEffect(() => {
    try {
      localStorage.setItem('survey_answers_autosave', JSON.stringify(answers));
      console.log('Zapisano odpowiedzi do localStorage:', answers);
    } catch (e) {
      console.error('Błąd podczas zapisywania odpowiedzi do localStorage:', e);
    }
  }, [answers]);
  
  // Zapisywanie orderId do localStorage
  useEffect(() => {
    if (orderId) {
      try {
        localStorage.setItem('survey_order_id', orderId);
        console.log('Zapisano orderId do localStorage:', orderId);
      } catch (e) {
        console.error('Błąd podczas zapisywania orderId do localStorage:', e);
      }
    }
  }, [orderId]);
  
  // Zapisywanie statusu instrukcji
  useEffect(() => {
    if (!showInstructions) {
      try {
        localStorage.setItem('survey_instructions_shown', 'true');
        console.log('Zapisano status instrukcji do localStorage');
      } catch (e) {
        console.error('Błąd podczas zapisywania statusu instrukcji do localStorage:', e);
      }
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
    setSavedQuestionIds([]);
    
    // Czyszczenie localStorage
    try {
      localStorage.removeItem('survey_config_autosave');
      localStorage.removeItem('survey_answers_autosave');
      localStorage.removeItem('survey_config_completed');
      localStorage.removeItem('survey_question_ids_autosave');
      localStorage.removeItem('survey_current_question_index'); // NOWE: Usuwamy też zapisany indeks pytania
      console.log('Ankieta zresetowana, localStorage wyczyszczone');
    } catch (e) {
      console.error('Błąd podczas czyszczenia localStorage:', e);
    }
    
    // Zachowujemy orderId i status instrukcji
    console.log('Ankieta zresetowana');
  };
  
  // Ustawienie pojedynczej odpowiedzi
  const setAnswer = (questionId: string, value: number) => {
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: value
      };
      
      try {
        // Natychmiastowy zapis do localStorage po każdej zmianie odpowiedzi
        localStorage.setItem('survey_answers_autosave', JSON.stringify(newAnswers));
        console.log(`Zapisano odpowiedź dla pytania ${questionId}: ${value}`);
      } catch (e) {
        console.error('Błąd podczas zapisywania odpowiedzi do localStorage:', e);
      }
      
      return newAnswers;
    });
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
    setSurveyConfig(prev => {
      const newConfig = { ...prev, userGender: gender };
      try {
        localStorage.setItem('survey_config_autosave', JSON.stringify(newConfig));
      } catch (e) {
        console.error('Błąd podczas zapisywania konfiguracji płci użytkownika:', e);
      }
      return newConfig;
    });
  };
  
  const setPartnerGender = (gender: Gender) => {
    setSurveyConfig(prev => {
      const newConfig = { ...prev, partnerGender: gender };
      try {
        localStorage.setItem('survey_config_autosave', JSON.stringify(newConfig));
      } catch (e) {
        console.error('Błąd podczas zapisywania konfiguracji płci partnera:', e);
      }
      return newConfig;
    });
  };
  
  const setGameLevel = (level: GameLevel) => {
    setSurveyConfig(prev => {
      const newConfig = { ...prev, gameLevel: level };
      try {
        localStorage.setItem('survey_config_autosave', JSON.stringify(newConfig));
      } catch (e) {
        console.error('Błąd podczas zapisywania konfiguracji poziomu gry:', e);
      }
      return newConfig;
    });
  };
  
  // Zakończenie etapu konfiguracji
  const completeConfig = () => {
    // ZMODYFIKOWANE: Dodajemy sprawdzenie kompletności konfiguracji
    if (!surveyConfig.userGender || !surveyConfig.partnerGender || !surveyConfig.gameLevel) {
      toast.error('Konfiguracja jest niekompletna. Uzupełnij wszystkie pola.');
      return;
    }
    
    setSurveyConfig(prev => {
      const newConfig = { ...prev, isConfigComplete: true };
      try {
        localStorage.setItem('survey_config_autosave', JSON.stringify(newConfig));
        localStorage.setItem('survey_config_completed', 'true');
      } catch (e) {
        console.error('Błąd podczas zapisywania zakończonej konfiguracji:', e);
      }
      return newConfig;
    });
    
    setIsInConfigurationMode(false);
  };
  
  // Zakończenie etapu instrukcji
  const completeInstructions = () => {
    setShowInstructions(false);
    try {
      localStorage.setItem('survey_instructions_shown', 'true');
    } catch (e) {
      console.error('Błąd podczas zapisywania statusu instrukcji:', e);
    }
  };
  
  // Ustawienie ID zamówienia
  const setOrderId = (id: string) => {
    setOrderIdState(id);
    try {
      localStorage.setItem('survey_order_id', id);
    } catch (e) {
      console.error('Błąd podczas zapisywania orderId:', e);
    }
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
    setIsInConfigurationMode, // DODANE: eksportujemy metodę do zmiany trybu konfiguracji
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
