
import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FormErrors {
  userName?: string;
  userEmail?: string;
  partnerName?: string;
  partnerEmail?: string;
}

const PRODUCT_PRICE = 199;

const PaymentPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { answers, surveyConfig } = useSurvey();
  
  // Check if survey is completed when component mounts
  useEffect(() => {
    const checkSurveyStatus = () => {
      const answersCount = Object.keys(answers).length;
      console.log('Current answers count:', answersCount);
      
      // Consider survey completed if there are answers or if coming back from payment with orderId
      if (answersCount > 0 || orderId) {
        setSurveyCompleted(true);
      } else {
        setSurveyCompleted(false);
      }
    };
    
    checkSurveyStatus();
  }, [answers, orderId]);
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!userName) newErrors.userName = 'Imię jest wymagane';
    if (!userEmail) {
      newErrors.userEmail = 'Email jest wymagany';
    } else if (!isValidEmail(userEmail)) {
      newErrors.userEmail = 'Nieprawidłowy format email';
    }
    if (!partnerName) newErrors.partnerName = 'Imię partnera jest wymagane';
    if (!partnerEmail) {
      newErrors.partnerEmail = 'Email partnera jest wymagany';
    } else if (!isValidEmail(partnerEmail)) {
      newErrors.partnerEmail = 'Nieprawidłowy format email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValid = () => {
    return validateForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'userEmail':
        setUserEmail(value);
        break;
      case 'partnerName':
        setPartnerName(value);
        break;
      case 'partnerEmail':
        setPartnerEmail(value);
        break;
      case 'giftWrap':
        setGiftWrap(type === 'checkbox' ? checked : false);
        break;
      default:
        break;
    }
  };
  
  // Save survey responses before initiating payment
  const saveResponses = async (orderId: string) => {
    try {
      console.log('Saving user survey responses for order:', orderId);
      
      if (Object.keys(answers).length === 0) {
        console.warn('No answers to save! Skipping survey response saving.');
        return false;
      }
      
      // Prepare survey responses for insertion
      const responsesToSave = Object.entries(answers).map(([questionId, answer]) => ({
        order_id: orderId,
        question_id: questionId,
        answer: answer,
        user_type: 'user'
        // User gender, partner gender and game level are removed as they don't exist in the database schema
      }));
      
      console.log('Saving responses:', responsesToSave);
      
      const { error } = await supabase
        .from('survey_responses')
        .insert(responsesToSave);
        
      if (error) {
        console.error('Error saving survey responses:', error);
        toast.error('Wystąpił błąd podczas zapisywania odpowiedzi z ankiety');
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid()) {
      setShowErrors(true);
      return;
    }
    
    // Even if orderId exists, still check if there are answers in context
    if (!surveyCompleted && Object.keys(answers).length === 0) {
      toast.error('Nie możesz złożyć zamówienia bez wypełnienia ankiety. Proszę wypełnij ankietę.');
      navigate('/survey');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create order in database - removing fields that don't exist in the schema
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_name: userName,
          user_email: userEmail,
          partner_name: partnerName,
          partner_email: partnerEmail,
          gift_wrap: giftWrap,
          price: PRODUCT_PRICE + (giftWrap ? 20 : 0),
          // Removed fields that don't exist in your database schema
          // user_gender: surveyConfig.userGender,
          // partner_gender: surveyConfig.partnerGender,
          // game_level: surveyConfig.gameLevel
        })
        .select()
        .single();
      
      if (orderError) {
        console.error('Order creation error:', orderError);
        throw orderError;
      }
      
      console.log('Order created:', orderData);
      
      // Save survey responses and wait for completion
      const responsesSaved = await saveResponses(orderData.id);
      
      if (!responsesSaved && Object.keys(answers).length > 0) {
        console.error('Failed to save survey responses');
        toast.error('Wystąpił błąd podczas zapisywania odpowiedzi z ankiety. Spróbuj ponownie później.');
        setIsProcessing(false);
        return;
      }
      
      // Proceed to create payment using Supabase edge function
      try {
        console.log('Creating payment for order:', orderData.id);
        
        const { data, error } = await supabase.functions.invoke('create-payment', {
          body: {
            data: {
              price: PRODUCT_PRICE + (giftWrap ? 20 : 0),
              currency: 'pln',
              user_name: userName,
              user_email: userEmail,
              partner_name: partnerName,
              partner_email: partnerEmail,
              gift_wrap: giftWrap,
              order_id: orderData.id
            }
          }
        });
        
        if (error) {
          console.error('Payment creation error:', error);
          throw new Error('Nie udało się utworzyć płatności: ' + error.message);
        }
        
        if (data.error) {
          console.error('Payment API error:', data.error);
          throw new Error('Błąd API płatności: ' + data.error);
        }
        
        if (!data.url) {
          console.error('Payment URL missing:', data);
          throw new Error('Nie otrzymano URL do płatności');
        }
        
        console.log('Payment session created, redirecting to:', data.url);
        
        // Update order with payment session ID
        if (data.sessionId) {
          const { error: updateError } = await supabase
            .from('orders')
            .update({ payment_id: data.sessionId })
            .eq('id', orderData.id);
            
          if (updateError) {
            console.error('Failed to update order with payment ID:', updateError);
          }
        }
        
        // Redirect to Stripe
        window.location.href = data.url;
      } catch (paymentError: any) {
        console.error('Payment creation failed:', paymentError);
        toast.error(paymentError.message || 'Wystąpił błąd podczas tworzenia płatności');
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast.error('Wystąpił błąd podczas przetwarzania zamówienia. Spróbuj ponownie.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Podsumowanie zamówienia</CardTitle>
            <CardDescription className="text-gray-500 text-center">Wypełnij dane, aby złożyć zamówienie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="userName">Imię</Label>
                <Input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={handleChange}
                  required
                  placeholder="Twoje imię"
                />
                {showErrors && errors.userName && (
                  <p className="text-red-500 text-sm">{errors.userName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail">Email</Label>
                <Input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={userEmail}
                  onChange={handleChange}
                  required
                  placeholder="Twój email"
                />
                {showErrors && errors.userEmail && (
                  <p className="text-red-500 text-sm">{errors.userEmail}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerName">Imię partnera/partnerki</Label>
                <Input
                  type="text"
                  id="partnerName"
                  name="partnerName"
                  value={partnerName}
                  onChange={handleChange}
                  required
                  placeholder="Imię Twojej drugiej połówki"
                />
                {showErrors && errors.partnerName && (
                  <p className="text-red-500 text-sm">{errors.partnerName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerEmail">Email partnera/partnerki</Label>
                <Input
                  type="email"
                  id="partnerEmail"
                  name="partnerEmail"
                  value={partnerEmail}
                  onChange={handleChange}
                  required
                  placeholder="Email Twojej drugiej połówki"
                />
                {showErrors && errors.partnerEmail && (
                  <p className="text-red-500 text-sm">{errors.partnerEmail}</p>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-4 mb-6">
                <Input
                  type="checkbox"
                  id="giftWrap"
                  name="giftWrap"
                  checked={giftWrap}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <Label htmlFor="giftWrap">Zapakuj na prezent (+20zł)</Label>
              </div>
              <div>
                <Button type="submit" disabled={isProcessing} className="w-full">
                  {isProcessing ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Przetwarzanie...</>
                  ) : (
                    <>Zapłać {PRODUCT_PRICE + (giftWrap ? 20 : 0)} zł</>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
