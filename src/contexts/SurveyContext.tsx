import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase, fetchFromSupabase } from '@/integrations/supabase/client';
import { questionsDatabase } from './questions-data';
import { toast } from 'sonner';

export type Gender = 'male' | 'female' | null;
export type GameLevel = 'discover' | 'explore' | 'exceed' | null;

export interface SurveyConfig {
  userGender: Gender;
  partnerGender: Gender;
  gameLevel: GameLevel;
  isConfigComplete: boolean;
}

export interface Question {
  id: string;
  text: string;
  description?: string;
  illustration?: string; // Ścieżka do obrazu ilustracji
  forConfig?: {
    userGender?: Gender;
    partnerGender?: Gender;
    gameLevel?: GameLevel[];
  };
  pairGroup?: string; // identyfikator grupy powiązanych pytań, np. "edging", "striptiz"
  pairPriority?: number; // kolejność w grupie, np. 1, 2 - ważne dla zachowania kolejności
}

interface SurveyContextType {
  currentQuestionIndex: number;
  answers: Record<string, number>;
  questions: Question[];
  surveyConfig: SurveyConfig;
  totalQuestions: number;
  setAnswer: (questionId: string, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  currentQuestion: Question | null;
  progress: number;
  resetSurvey: () => void;
  setUserGender: (gender: Gender) => void;
  setPartnerGender: (gender: Gender) => void;
  setGameLevel: (level: GameLevel) => void;
  completeConfig: () => void;
  isInConfigurationMode: boolean;
  filteredQuestions: Question[];
  saveAnswer: (isPartnerSurvey?: boolean) => Promise<void>;
  setOrderId: (orderId: string) => void;
  getOrderId: () => string | null;
}

// Funkcja do losowego wyboru pytań z zachowaniem par
const getRandomizedQuestions = (questions: Question[], config: SurveyConfig, maxQuestions: number = 15) => {
  // 1. Najpierw filtrujemy pytania pod kątem konfiguracji
  const filteredByConfig = questions.filter(question => {
    if (!question.forConfig) return true;
    
    const { userGender, partnerGender, gameLevel } = question.forConfig;
    
    // Sprawdzamy filtrowanie po płci (jeśli określono)
    if (userGender && userGender !== config.userGender) return false;
    if (partnerGender && partnerGender !== config.partnerGender) return false;
    
    // Sprawdzamy filtrowanie po poziomie gry (jeśli określono)
    if (gameLevel && !gameLevel.includes(config.gameLevel as GameLevel)) return false;
    
    return true;
  });

  // 2. Grupujemy pytania według pairGroup
  const groupedQuestions: Record<string, Question[]> = {};
  const singleQuestions: Question[] = [];

  filteredByConfig.forEach(question => {
    if (question.pairGroup) {
      if (!groupedQuestions[question.pairGroup]) {
        groupedQuestions[question.pairGroup] = [];
      }
      groupedQuestions[question.pairGroup].push(question);
    } else {
      singleQuestions.push(question);
    }
  });

  // 3. Wybieramy losowo grupy pytań i pojedyncze pytania
  const result: Question[] = [];
  const availableGroups = Object.keys(groupedQuestions);
  const totalGroups = availableGroups.length;
  const totalSingles = singleQuestions.length;
  
  // Określamy liczbę grup i pojedynczych pytań do wybrania
  const groupsToSelect = Math.min(Math.floor(maxQuestions / 2), totalGroups);
  let remainingSlots = maxQuestions - (groupsToSelect * 2); // Ile zostało miejsca po parach
  
  // Losowo wybieramy grupy pytań
  const selectedGroups = availableGroups
    .sort(() => 0.5 - Math.random())
    .slice(0, groupsToSelect);
  
  // Losowo wybieramy pojedyncze pytania, aby wypełnić pozostałe miejsca
  const selectedSingles = singleQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, remainingSlots);
  
  // Jeśli nie mamy wystarczającej liczby pytań, to wypełniamy resztę losowymi pytaniami
  // (może się zdarzyć, że będziemy mieć za mało pytań dla danej konfiguracji)
  if (result.length + selectedSingles.length < maxQuestions) {
    const needMore = maxQuestions - (result.length + selectedSingles.length);
    const moreGroups = availableGroups
      .filter(g => !selectedGroups.includes(g))
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.ceil(needMore / 2));
      
    moreGroups.forEach(group => {
      const sortedGroupQuestions = groupedQuestions[group]
        .sort((a, b) => (a.pairPriority || 0) - (b.pairPriority || 0));
      selectedGroups.push(group);
      // Dodajemy tylko tyle pytań, ile potrzebujemy
      if (result.length + selectedSingles.length + sortedGroupQuestions.length <= maxQuestions) {
        // Możemy dodać całą grupę
      } else {
        // Nie możemy dodać całej grupy, więc dodajemy tylko pojedyncze pytania z tej grupy
        const canAdd = maxQuestions - (result.length + selectedSingles.length);
        sortedGroupQuestions.splice(canAdd);
      }
    });
  }
  
  // 4. Dodajemy pytania z wybranych grup, zachowując kolejność (pairPriority)
  selectedGroups.forEach(group => {
    const sortedGroupQuestions = groupedQuestions[group]
      .sort((a, b) => (a.pairPriority || 0) - (b.pairPriority || 0));
    result.push(...sortedGroupQuestions);
  });
  
  result.push(...selectedSingles);
  
  // 5. Losowo mieszamy wszystkie pytania, ale utrzymujemy pary obok siebie
  // Najpierw grupujemy wyniki zgodnie z pairGroup
  const resultGroups: Record<string, Question[]> = {};
  const resultSingles: Question[] = [];
  
  result.forEach(question => {
    if (question.pairGroup) {
      if (!resultGroups[question.pairGroup]) {
        resultGroups[question.pairGroup] = [];
      }
      resultGroups[question.pairGroup].push(question);
    } else {
      resultSingles.push(question);
    }
  });

  // Teraz losowo układamy grupy i pojedyncze pytania, zachowując integralność par
  const finalResult: Question[] = [];
  const resultGroupsArray = Object.values(resultGroups);
  const allElements = [...resultGroupsArray, ...resultSingles.map(q => [q])];
  
  allElements
    .sort(() => 0.5 - Math.random())
    .forEach(element => {
      if (Array.isArray(element)) {
        // Sortujemy pytania w grupie według pairPriority
        const sortedGroup = (element as Question[])
          .sort((a, b) => (a.pairPriority || 0) - (b.pairPriority || 0));
        finalResult.push(...sortedGroup);
      }
    });
  
  // Upewniamy się, że mamy dokładnie maxQuestions pytań
  return finalResult.slice(0, maxQuestions);
};

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

  // Store orderId for partner surveys
  const [partnerOrderId, setPartnerOrderId] = useState<string | null>(null);
  
  // Add state variables for loading and error handling
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  
  // Store selected questions sequence for partner surveys
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  // If this is a partner survey, get the order ID associated with the token
  useEffect(() => {
    const fetchOrderId = async () => {
      if (!partnerToken) return;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('id')
          .eq('partner_survey_token', partnerToken)
          .single();
          
        if (error) {
          console.error('Error fetching order ID:', error);
          return;
        }
        
        if (data) {
          console.log('Partner survey order ID:', data.id);
          setPartnerOrderId(data.id);
          
          // Fetch question sequence for this order
          fetchOrderQuestionSequence(data.id);
        }
      } catch (error) {
        console.error('Failed to fetch order ID:', error);
      }
    };
    
    if (partnerToken) {
      fetchOrderId();
    }
  }, [partnerToken]);

  const isInConfigurationMode = !surveyConfig.isConfigComplete;

  // Load question sequence for partner survey
  const fetchOrderQuestionSequence = async (orderId: string) => {
    try {
      console.log('Fetching question sequence for order:', orderId);
      
      // Fetch responses to get the sequence
      const { data, error } = await supabase
        .from('survey_responses')
        .select('question_id')
        .eq('order_id', orderId)
        .eq('user_type', 'user')  // Only user's responses to get the sequence
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching question sequence:', error);
        return;
      }
      
      if (data && data.length > 0) {
        // Extract question IDs in the same order
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

  // Generate or load questions based on partner status
  const filteredQuestions = useMemo(() => {
    if (!surveyConfig.isConfigComplete) return [];
    
    // For partner survey with existing questions
    if (partnerToken && selectedQuestionIds.length > 0) {
      console.log('Using predefined question sequence for partner:', selectedQuestionIds);
      // Map question IDs to actual questions in the same order
      return selectedQuestionIds
        .map(id => questions.find(q => q.id === id))
        .filter(q => q !== undefined) as Question[];
    }
    
    // For regular user survey, generate random questions
    const randomQuestions = getRandomizedQuestions(questions, surveyConfig, 15);
    
    // If this is the initial selection for a user (not partner), store the question IDs
    if (!partnerToken && !selectedQuestionIds.length) {
      const ids = randomQuestions.map(q => q.id);
      setSelectedQuestionIds(ids);
    }
    
    return randomQuestions;
  }, [questions, surveyConfig, partnerToken, selectedQuestionIds]);

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
    
    // Immediately save answer for partner surveys
    if (partnerToken && partnerOrderId) {
      const saveToDatabase = async () => {
        try {
          console.log('Auto-saving partner answer for question', questionId, 'with value', value);
          
          // First check if this answer already exists to prevent duplicates
          const { data: existingData, error: checkError } = await supabase
            .from('survey_responses')
            .select('id')
            .eq('order_id', partnerOrderId)
            .eq('question_id', questionId)
            .eq('user_type', 'partner');
            
          if (checkError) {
            console.error('Error checking for existing responses:', checkError);
          }
          
          // If answer already exists, update it instead of inserting
          if (existingData && existingData.length > 0) {
            console.log('Updating existing answer for question', questionId);
            const { error: updateError } = await supabase
              .from('survey_responses')
              .update({ answer: value })
              .eq('id', existingData[0].id);
              
            if (updateError) {
              console.error('Error updating partner response:', updateError);
            } else {
              console.log('Successfully updated partner response');
            }
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
              
            if (error) {
              console.error('Error auto-saving partner response:', error);
            } else {
              console.log('Successfully auto-saved partner response');
            }
          }
        } catch (err) {
          console.error('Failed to auto-save partner response:', err);
        }
      };
      
      saveToDatabase();
    }
  }, [partnerToken, partnerOrderId, surveyConfig]);

  // Save answer to database
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
    // Blokujemy przejście, jeśli nie ma odpowiedzi na aktualne pytanie
    const currentQ = filteredQuestions[currentQuestionIndex];
    if (!currentQ || answers[currentQ.id] === undefined) {
      console.log("Blocked navigation - no answer for current question");
      return;
    }
    
    // Try to save the answer (for partner surveys)
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
    // Reset stanu ankiety
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
    
    // Clear any previously cached question sequence
    if (!partnerToken) {
      setSelectedQuestionIds([]);
    }
  }, [partnerToken]);

  // Add the setOrderId method to update the orderId
  const setOrderId = useCallback((orderId: string) => {
    console.log('Setting order ID:', orderId);
    setPartnerOrderId(orderId);
  }, []);

  // Add the getOrderId method to retrieve the orderId
  const getOrderId = useCallback(() => {
    return partnerOrderId;
  }, [partnerOrderId]);

  // Fetch order details if this is a partner survey
  useEffect(() => {
    // Fetch order details if this is a partner survey
    const fetchOrderDetails = async () => {
      if (!partnerToken) return;
      
      setIsLoadingOrder(true);
      setError(null);
      
      try {
        console.log('Fetching order details for partner token:', partnerToken);
        
        // Try first with normal client
        try {
          // Get the order associated with this partner token
          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .select('id, user_name, partner_name, user_gender, partner_gender, game_level')
            .eq('partner_survey_token', partnerToken)
            .single();
          
          if (!orderError && orderData) {
            console.log('Found order with SDK:', orderData);
            
            // Process and return the order data
            processOrderData(orderData);
            return;
          }
          
          console.error('Error or no data from SDK, trying direct API:', orderError);
          
          // If SDK fails, try direct API
          const directData = await fetchFromSupabase(`orders?partner_survey_token=eq.${encodeURIComponent(partnerToken)}`);
          
          if (directData && directData.length > 0) {
            console.log('Found order with direct API:', directData[0]);
            processOrderData(directData[0]);
            return;
          }
          
          throw new Error('Nie znaleziono ankiety lub link jest nieprawidłowy');
        } catch (err) {
          console.error('All methods failed to fetch order:', err);
          throw new Error('Nie znaleziono ankiety dla tego linku');
        }
      } catch (err: any) {
        console.error('Error fetching order details:', err);
        setError(err.message || 'Wystąpił błąd podczas ładowania ankiety');
      } finally {
        setIsLoadingOrder(false);
      }
    };
    
    const processOrderData = (orderData: any) => {
      // Check if the order exists and is valid
      if (!orderData.id) {
        throw new Error('Nieprawidłowe dane zamówienia');
      }
      
      // Store the order ID in the survey context
      setPartnerOrderId(orderData.id);
      
      // Set default configuration if any values are missing
      const userGender = orderData.user_gender || 'male';
      const partnerGender = orderData.partner_gender || 'female';
      const gameLevel = orderData.game_level || 'discover';
      
      // ISTOTNA ZMIANA: Dla ankiety partnera, ustawiamy DOKŁADNIE TAKĄ SAMĄ KONFIGURACJĘ
      // jak w ankiecie zamawiającego, aby zagwarantować identyczne pytania
      setOrderDetails({
        userName: orderData.user_name,
        partnerName: orderData.partner_name,
        userGender: userGender as 'male' | 'female',
        partnerGender: partnerGender as 'male' | 'female',
        gameLevel: gameLevel as 'discover' | 'explore' | 'exceed',
        orderId: orderData.id
      });
      
      // Pre-configure the survey with the same settings as the user's survey
      // We use the SAME user_gender and partner_gender as in the original survey
      setUserGender(userGender as 'male' | 'female');
      setPartnerGender(partnerGender as 'male' | 'female');
      setGameLevel(gameLevel as 'discover' | 'explore' | 'exceed');
      
      // Fetch questions sequence for this order
      fetchOrderQuestionSequence(orderData.id);
      
      toast.success('Ankieta załadowana pomyślnie');
    };
    
    if (partnerToken) {
      fetchOrderDetails();
    }
  }, [partnerToken, setUserGender, setPartnerGender, setGameLevel]);

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
    isInConfigurationMode,
    filteredQuestions,
    saveAnswer,
    setOrderId,
    getOrderId,
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
