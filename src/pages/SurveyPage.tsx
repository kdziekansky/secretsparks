
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import SurveyConfig from '@/components/SurveyConfig';
import PartnerWelcome from '@/components/PartnerWelcome';
import { Loader2 } from 'lucide-react';

interface OrderDetails {
  userName: string;
  partnerName: string;
  userGender: 'male' | 'female';
  partnerGender: 'male' | 'female';
  gameLevel: 'discover' | 'explore' | 'exceed';
}

const SurveyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const partnerToken = searchParams.get('token');
  
  const { 
    progress, 
    isInConfigurationMode,
    setUserGender,
    setPartnerGender,
    setGameLevel
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
      try {
        // Get the order associated with this partner token
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('user_name, partner_name, id')
          .eq('partner_survey_token', partnerToken)
          .single();
        
        if (orderError || !orderData) {
          throw new Error('Nie znaleziono ankiety lub link jest nieprawidłowy');
        }
        
        // Get the user's responses to extract configuration
        const { data: responsesData, error: responsesError } = await supabase
          .from('survey_responses')
          .select('user_gender, partner_gender, game_level')
          .eq('order_id', orderData.id)
          .eq('user_type', 'user')
          .limit(1);
        
        if (responsesError) {
          throw new Error('Nie udało się pobrać konfiguracji ankiety');
        }

        console.log('User responses found:', responsesData);
        
        // IMPORTANT: Use let instead of const to allow reassignment
        let config = responsesData && responsesData.length > 0 
          ? {
              userGender: responsesData[0].user_gender,
              partnerGender: responsesData[0].partner_gender,
              gameLevel: responsesData[0].game_level
            }
          : null;
        
        if (!config) {
          // Check if there are ANY responses from the user - they may not have config in responses
          const { count, error: countError } = await supabase
            .from('survey_responses')
            .select('*', { count: 'exact', head: true })
            .eq('order_id', orderData.id)
            .eq('user_type', 'user');
            
          if (countError) {
            console.error('Error checking user response count:', countError);
          }
          
          // If there are no responses at all, the user hasn't completed their survey
          if (count === 0) {
            throw new Error('Zamawiający nie wypełnił jeszcze swojej ankiety');
          }
          
          // Get order configuration if there are responses but no config in them
          const { data: orderConfigData, error: orderConfigError } = await supabase
            .from('orders')
            .select('user_gender, partner_gender, game_level')
            .eq('id', orderData.id)
            .single();
            
          if (orderConfigError || !orderConfigData.user_gender) {
            throw new Error('Nie udało się pobrać konfiguracji ankiety');
          }
          
          // Use order config instead
          config = {
            userGender: orderConfigData.user_gender,
            partnerGender: orderConfigData.partner_gender,
            gameLevel: orderConfigData.game_level
          };
        }
        
        setOrderDetails({
          userName: orderData.user_name,
          partnerName: orderData.partner_name,
          ...config
        });
        
        // Pre-configure the survey with the same settings as the user's survey
        // Note: For partner survey, we swap userGender and partnerGender to match the partner's perspective
        setUserGender(config.partnerGender);
        setPartnerGender(config.userGender);
        setGameLevel(config.gameLevel);
        
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
  }, [partnerToken, setUserGender, setPartnerGender, setGameLevel]);
  
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
