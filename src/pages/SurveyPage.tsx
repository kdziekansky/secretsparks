
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase, fetchFromSupabase } from '@/integrations/supabase/client';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import SurveyConfig from '@/components/SurveyConfig';
import PartnerWelcome from '@/components/PartnerWelcome';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface OrderDetails {
  userName: string;
  partnerName: string;
  userGender: 'male' | 'female';
  partnerGender: 'male' | 'female';
  gameLevel: 'discover' | 'explore' | 'exceed';
  orderId?: string;
}

const SurveyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const partnerToken = searchParams.get('token');
  
  const { 
    progress, 
    isInConfigurationMode,
    setUserGender,
    setPartnerGender,
    setGameLevel,
    setOrderId
  } = useSurvey();
  
  const [isPartnerSurvey, setIsPartnerSurvey] = useState<boolean>(!!partnerToken);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderFetched, setOrderFetched] = useState<boolean>(false);
  
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
            .select('user_name, partner_name, id, user_gender, partner_gender, game_level')
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
      
      // Mark as fetched to prevent repeated fetches
      setOrderFetched(true);
      
      toast.success('Ankieta załadowana pomyślnie');
    };
    
    if (partnerToken && !orderFetched) {
      fetchOrderDetails();
    }
  }, [partnerToken, orderFetched, setUserGender, setPartnerGender, setGameLevel, setOrderId]);
  
  if (isLoadingOrder) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
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
        <div className="glass-panel w-full max-w-md p-6 text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">Błąd</h2>
          <p className="mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Skontaktuj się z osobą, która wysłała Ci zaproszenie, aby otrzymać nowy link.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      {!isInConfigurationMode && (
        <div className="w-full max-w-xl mb-8">
          <ProgressBar progress={progress} />
        </div>
      )}
      
      {isInConfigurationMode ? (
        isPartnerSurvey && orderDetails ? (
          <PartnerWelcome orderDetails={orderDetails} />
        ) : (
          <SurveyConfig />
        )
      ) : (
        <QuestionCard isPartnerSurvey={isPartnerSurvey} />
      )}
    </div>
  );
};

export default SurveyPage;
