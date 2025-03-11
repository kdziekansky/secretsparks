import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
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
  
  useEffect(() => {
    // Fetch order details if this is a partner survey
    const fetchOrderDetails = async () => {
      if (!partnerToken) return;
      
      setIsLoadingOrder(true);
      setError(null);
      
      try {
        console.log('Fetching order details for partner token:', partnerToken);
        
        // Get the order associated with this partner token
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('user_name, partner_name, id, user_gender, partner_gender, game_level')
          .eq('partner_survey_token', partnerToken)
          .single();
        
        if (orderError) {
          console.error('Error fetching order:', orderError);
          throw new Error('Nie znaleziono ankiety lub link jest nieprawidłowy');
        }
        
        if (!orderData) {
          console.error('No order found for token:', partnerToken);
          throw new Error('Nie znaleziono ankiety dla tego linku');
        }
        
        console.log('Found order:', orderData);
        
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
        
        // Allow partner survey even if the user hasn't completed their survey yet
        // We'll just provide the configuration data
        setOrderDetails({
          userName: orderData.user_name,
          partnerName: orderData.partner_name,
          userGender: userGender as 'male' | 'female',
          partnerGender: partnerGender as 'male' | 'female',
          gameLevel: gameLevel as 'discover' | 'explore' | 'exceed',
          orderId: orderData.id
        });
        
        // Pre-configure the survey with the same settings as the user's survey
        // Note: For partner survey, we swap userGender and partnerGender to match the partner's perspective
        setUserGender(partnerGender as 'male' | 'female');
        setPartnerGender(userGender as 'male' | 'female');
        setGameLevel(gameLevel as 'discover' | 'explore' | 'exceed');
        
        toast.success('Ankieta załadowana pomyślnie');
        
      } catch (err: any) {
        console.error('Error fetching order details:', err);
        setError(err.message || 'Wystąpił błąd podczas ładowania ankiety');
      } finally {
        setIsLoadingOrder(false);
      }
    };
    
    if (partnerToken) {
      fetchOrderDetails();
    }
  }, [partnerToken, setUserGender, setPartnerGender, setGameLevel, setOrderId]);
  
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
