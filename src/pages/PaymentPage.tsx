
import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const { answers, surveyConfig } = useSurvey();
  
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
        user_type: 'user',
        user_gender: surveyConfig.userGender,
        partner_gender: surveyConfig.partnerGender,
        game_level: surveyConfig.gameLevel
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
    
    if (Object.keys(answers).length === 0) {
      toast.error('Nie możesz złożyć zamówienia bez wypełnienia ankiety. Proszę wypełnij ankietę.');
      navigate('/survey');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_name: userName,
          user_email: userEmail,
          partner_name: partnerName,
          partner_email: partnerEmail,
          gift_wrap: giftWrap,
          price: PRODUCT_PRICE + (giftWrap ? 20 : 0),
          user_gender: surveyConfig.userGender,
          partner_gender: surveyConfig.partnerGender,
          game_level: surveyConfig.gameLevel
        })
        .select()
        .single();
      
      if (orderError) {
        throw orderError;
      }
      
      console.log('Order created:', orderData);
      
      // Save survey responses and wait for completion
      const responsesSaved = await saveResponses(orderData.id);
      
      if (!responsesSaved) {
        console.error('Failed to save survey responses');
        toast.error('Wystąpił błąd podczas zapisywania odpowiedzi z ankiety. Spróbuj ponownie później.');
        setIsProcessing(false);
        return;
      }
      
      // Redirect to payment gateway
      // For now, just navigate to a thank you page
      toast.success('Zamówienie złożone! Przekierowywanie do płatności...');
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.');
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
