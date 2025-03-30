
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase, fetchFromSupabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import SurveyConfig from '@/components/SurveyConfig';
import PartnerWelcome from '@/components/PartnerWelcome';
import SurveyInstruction from '@/components/SurveyInstruction';
import { Loader2, AlertTriangle, Clock } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GameLevel } from '@/types/survey';

interface OrderDetails {
  userName: string;
  partnerName: string;
  userGender: 'male' | 'female';
  partnerGender: 'male' | 'female';
  gameLevel: GameLevel;
  orderId?: string;
}

const SurveyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const partnerToken = searchParams.get('token');
  const isMobile = useIsMobile();
  
  const { 
    progress, 
    isInConfigurationMode,
    showInstructions,
    setUserGender,
    setPartnerGender,
    setGameLevel,
    setOrderId,
    filteredQuestions,
    resetSurvey,
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    isFirstQuestion,
    isLastQuestion,
    currentQuestion
  } = useSurvey();
  
  const [isPartnerSurvey, setIsPartnerSurvey] = useState<boolean>(!!partnerToken);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderFetched, setOrderFetched] = useState<boolean>(false);
  const [waitingForQuestions, setWaitingForQuestions] = useState<boolean>(false);
  
  // Reset survey on component mount, but only for standard survey (not partner survey)
  useEffect(() => {
    if (!isPartnerSurvey) {
      resetSurvey();
    }
  }, [resetSurvey, isPartnerSurvey]);
  
  useEffect(() => {
    // Fetch order details if this is a partner survey
    const fetchOrderDetails = async () => {
      // Prevent refetching if already fetched
      if (!partnerToken || orderFetched) return;
      
      setIsLoadingOrder(true);
      setError(null);
      
      try {
        console.log('Fetching order details for partner token:', partnerToken);
        
        // Try first with normal client
        try {
          // Get the order associated with this partner token
          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .select('user_name, partner_name, id, user_gender, partner_gender, game_level, user_question_sequence')
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
      setOrderId(orderData.id);
      
      // Set default configuration if any values are missing
      const userGender = orderData.user_gender || 'male';
      const partnerGender = orderData.partner_gender || 'female';
      const gameLevel = orderData.game_level || 'discover';
      
      // Check if we have stored user_question_sequence for partner survey
      if (isPartnerSurvey && (!orderData.user_question_sequence || orderData.user_question_sequence.length === 0)) {
        // If we don't have question sequence, we need to wait for it
        console.log('No stored question sequence found in order table. Will wait for data.');
        setWaitingForQuestions(true);
      } else if (isPartnerSurvey && orderData.user_question_sequence) {
        console.log('Found stored question sequence in order table:', orderData.user_question_sequence);
        setWaitingForQuestions(false);
      }
      
      // CRITICAL: For partner survey, use EXACTLY the same configuration
      // as in the user's survey to guarantee identical questions
      setOrderDetails({
        userName: orderData.user_name,
        partnerName: orderData.partner_name,
        userGender: userGender as 'male' | 'female',
        partnerGender: partnerGender as 'male' | 'female',
        gameLevel: gameLevel as GameLevel,
        orderId: orderData.id
      });
      
      // Pre-configure the survey with the SAME settings as the user's survey
      setUserGender(userGender as 'male' | 'female');
      setPartnerGender(partnerGender as 'male' | 'female');
      setGameLevel(gameLevel as GameLevel);
      
      // Mark as fetched to prevent repeated fetches
      setOrderFetched(true);
      
      toast.success('Ankieta załadowana pomyślnie');
    };
    
    if (partnerToken && !orderFetched) {
      fetchOrderDetails();
    }
  }, [partnerToken, orderFetched, setUserGender, setPartnerGender, setGameLevel, setOrderId, isPartnerSurvey]);
  
  // Dodany efekt do sprawdzania, czy mamy już pytania dla partnera
  useEffect(() => {
    if (isPartnerSurvey && waitingForQuestions && filteredQuestions.length > 0) {
      console.log('Question sequence loaded successfully, questions available:', filteredQuestions.length);
      setWaitingForQuestions(false);
    }
  }, [isPartnerSurvey, waitingForQuestions, filteredQuestions]);
  
  
  if (isLoadingOrder) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-lg">Ładowanie ankiety...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="glass-panel w-full max-w-md p-6 text-center">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <AlertDescription className="font-medium text-lg">
              {error}
            </AlertDescription>
          </Alert>
          
          <p className="mb-4">
            {partnerToken ? 
              'Zamawiający musi najpierw wypełnić swoją ankietę, zanim partner będzie mógł wypełnić swoją.' : 
              'Wystąpił błąd podczas ładowania ankiety.'
            }
          </p>
          
          <p className="text-sm text-gray-500">
            Skontaktuj się z osobą, która wysłała Ci zaproszenie, aby otrzymać nowy link.
          </p>
        </div>
      </div>
    );
  }
  
  if (isPartnerSurvey && !isLoadingOrder && waitingForQuestions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="glass-panel w-full max-w-md p-6 text-center">
          <Clock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">Oczekiwanie na pytania</h2>
          <p className="mb-6">
            Oczekujemy na dane z ankiety zamawiającego. Proszę odczekać chwilę...
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <Toaster position={isMobile ? "bottom-center" : "top-center"} />
      
      {/* Pasek postępu pokażemy tylko podczas pytań, nie podczas konfiguracji czy instrukcji */}
      {!isInConfigurationMode && !showInstructions && (
        <div className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-xl'} mb-6 md:mb-8`}>
          <ProgressBar progress={progress} />
        </div>
      )}
      
      {/* Ekran z instrukcjami - widoczny tylko dla głównego użytkownika (nie partnera) i tylko przed konfiguracją */}
      {showInstructions && !isPartnerSurvey ? (
        <SurveyInstruction />
      ) : isInConfigurationMode ? (
        isPartnerSurvey && orderDetails ? (
          <PartnerWelcome orderDetails={orderDetails} />
        ) : (
          <SurveyConfig />
        )
      ) : (
        currentQuestion && (
          <QuestionCard 
            question={currentQuestion}
            onNext={nextQuestion}
            onPrev={prevQuestion}
            isLast={isLastQuestion}
            isFirst={isFirstQuestion}
          />
        )
      )}
    </div>
  );
};

export default SurveyPage;
