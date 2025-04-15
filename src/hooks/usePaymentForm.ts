
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSurvey } from '@/contexts/SurveyContext';

export const usePaymentForm = (orderId: string | null) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formValid, setFormValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const { answers, surveyConfig, filteredQuestions, saveAnswer } = useSurvey();

  // Walidacja pól formularza
  useEffect(() => {
    if (formStep === 1) {
      setFormValid(!!userName && !!userEmail && userEmail.includes('@'));
    } else if (formStep === 2) {
      setFormValid(!!partnerName && !!partnerEmail && partnerEmail.includes('@'));
    } else if (formStep === 3) {
      // Krok podsumowania - zawsze ważny, jeśli poprzednie kroki były poprawne
      setFormValid(true);
    }
  }, [userName, userEmail, partnerName, partnerEmail, formStep]);

  // Save survey responses before initiating payment
  const saveResponses = async (orderId: string) => {
    try {
      console.log('Saving user survey responses for order:', orderId);
      if (Object.keys(answers).length === 0) {
        console.warn('No answers to save! Skipping survey response saving.');
        return true;
      }

      // Set default values for survey config if they're missing
      const safeConfig = {
        userGender: surveyConfig.userGender || 'unknown',
        partnerGender: surveyConfig.partnerGender || 'unknown',
        gameLevel: surveyConfig.gameLevel || 'discover'
      };

      // Save question sequence to orders table
      const questionSequence = filteredQuestions.map(q => q.id);
      console.log('Saving question sequence to orders table:', questionSequence);
      const {
        error: sequenceError
      } = await supabase.from('orders').update({
        user_question_sequence: questionSequence
      }).eq('id', orderId);
      if (sequenceError) {
        console.error('Error saving question sequence:', sequenceError);
      } else {
        console.log('Question sequence saved successfully');
      }

      // Prepare responses to save
      const responsesToSave = Object.entries(answers).map(([questionId, answer]) => ({
        order_id: orderId,
        question_id: questionId,
        answer: answer,
        user_type: 'user',
        user_gender: safeConfig.userGender,
        partner_gender: safeConfig.partnerGender,
        game_level: safeConfig.gameLevel
      }));

      // Try saving responses
      console.log('Attempting to save responses using INSERT');
      const {
        error
      } = await supabase.from('survey_responses').insert(responsesToSave);
      if (error) {
        console.error('Error saving survey responses:', error);
        return false;
      } else {
        console.log('Survey responses saved successfully');
        return true;
      }
    } catch (error) {
      console.error('Failed to save survey responses:', error);
      return false;
    }
  };

  const handleNextStep = () => {
    if (formStep < 3) {
      if (formValid) {
        setFormStep(formStep + 1);
      } else {
        if (!userName && formStep === 1) {
          toast.error('Podaj swoje imię');
        } else if (!userEmail && formStep === 1) {
          toast.error('Podaj swój email');
        } else if (!userEmail.includes('@') && formStep === 1) {
          toast.error('Podaj poprawny adres email');
        } else if (!partnerName && formStep === 2) {
          toast.error('Podaj imię partnera/ki');
        } else if (!partnerEmail && formStep === 2) {
          toast.error('Podaj email partnera/ki');
        } else if (!partnerEmail.includes('@') && formStep === 2) {
          toast.error('Podaj poprawny adres email partnera/ki');
        }
      }
    }
  };

  const handlePrevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleUserFormChange = (field: string, value: string) => {
    if (field === 'userName') setUserName(value);
    if (field === 'userEmail') setUserEmail(value);
  };

  const handlePartnerFormChange = (field: string, value: any) => {
    if (field === 'partnerName') setPartnerName(value);
    if (field === 'partnerEmail') setPartnerEmail(value);
    if (field === 'giftWrap') setGiftWrap(value);
    if (field === 'ageConfirmed') setAgeConfirmed(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`handleSubmit called at formStep ${formStep}`);
    
    // If not on the last step, proceed to next step
    if (formStep < 3) {
      console.log('Proceeding to next step');
      handleNextStep();
      return;
    }
    
    // Jesteśmy na kroku podsumowania (3) - rozpocznij płatność
    if (formStep === 3) {
      console.log('Starting payment process...');
      await processPayment();
      return;
    }
  };

  // Nowa funkcja do obsługi płatności
  const processPayment = async () => {
    // Validation for payment step
    if (!userName || !userEmail || !partnerName || !partnerEmail) {
      toast.error('Wypełnij wszystkie wymagane pola');
      return;
    }
    
    setIsProcessing(true);
    try {
      console.log('Creating order in database');

      // Sanitize data
      const sanitizedUserName = userName.trim().substring(0, 100);
      const sanitizedUserEmail = userEmail.trim().toLowerCase().substring(0, 150);
      const sanitizedPartnerName = partnerName.trim().substring(0, 100);
      const sanitizedPartnerEmail = partnerEmail.trim().toLowerCase().substring(0, 150);

      // Set default survey config values
      const safeConfig = {
        userGender: surveyConfig.userGender || 'male',
        partnerGender: surveyConfig.partnerGender || 'female',
        gameLevel: surveyConfig.gameLevel || 'discover'
      };

      // Create order in database
      const {
        data: orderData,
        error: orderError
      } = await supabase.from('orders').insert({
        user_name: sanitizedUserName,
        user_email: sanitizedUserEmail,
        partner_name: sanitizedPartnerName,
        partner_email: sanitizedPartnerEmail,
        gift_wrap: giftWrap,
        price: 29, // Fixed product price
        user_gender: safeConfig.userGender,
        partner_gender: safeConfig.partnerGender,
        game_level: safeConfig.gameLevel
      }).select().single();
      
      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error('Nie udało się utworzyć zamówienia: ' + orderError.message);
      }
      console.log('Order created:', orderData);

      // Save survey responses
      const responsesSaved = await saveResponses(orderData.id);
      if (!responsesSaved && Object.keys(answers).length > 0) {
        console.error('Failed to save survey responses');
        toast.error('Wystąpił błąd podczas zapisywania odpowiedzi z ankiety.');
        setIsProcessing(false);
        return;
      }

      // Proceed to create payment
      try {
        const paymentData = {
          price: 29, // Fixed product price
          currency: 'pln',
          user_name: sanitizedUserName,
          user_email: sanitizedUserEmail,
          partner_name: sanitizedPartnerName,
          partner_email: sanitizedPartnerEmail,
          gift_wrap: giftWrap,
          order_id: orderData.id
        };
        
        console.log('Preparing payment data');
        const supabaseUrl = 'https://bqbgrjpxufblrgcoxpfk.supabase.co';
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxYmdyanB4dWZibHJnY294cGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1Mzk4NzUsImV4cCI6MjA1NzExNTg3NX0.kSryhe5Z4BILp_ss5LpSxanGSvx4HZzZtVzYia4bgik";
        
        const requestPayload = {
          data: paymentData
        };
        
        console.log('Sending request to create-payment endpoint');
        const response = await fetch(`${supabaseUrl}/functions/v1/create-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'apikey': supabaseKey
          },
          body: JSON.stringify(requestPayload)
        });

        // Check response
        const responseText = await response.text();
        console.log('Response received:', responseText);
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          throw new Error(`Nieprawidłowy format odpowiedzi: ${responseText.substring(0, 200)}...`);
        }
        if (!data) {
          throw new Error('Brak danych w odpowiedzi');
        }
        if (data.error) {
          throw new Error(data.error);
        }
        if (!data.url) {
          throw new Error('Brak URL do płatności w odpowiedzi: ' + JSON.stringify(data));
        }

        // Update order with payment session ID
        if (data.sessionId) {
          await supabase.from('orders').update({
            payment_id: data.sessionId
          }).eq('id', orderData.id);
          console.log('Updated order with payment session ID');
        }

        // Redirect to Stripe
        console.log('Redirecting to payment URL:', data.url);
        window.location.href = data.url;
      } catch (paymentError: any) {
        console.error('Payment creation error:', paymentError);
        toast.error(`Błąd płatności: ${paymentError.message || 'Nieznany błąd'}`);
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast.error(error.message || 'Wystąpił błąd podczas przetwarzania zamówienia.');
      setIsProcessing(false);
    }
  };

  return {
    formData: {
      userName,
      userEmail,
      partnerName,
      partnerEmail,
      giftWrap,
      ageConfirmed
    },
    formStep,
    formValid,
    isProcessing,
    handleUserFormChange,
    handlePartnerFormChange,
    handlePrevStep,
    handleNextStep,
    handleSubmit
  };
};
