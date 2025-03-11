
import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Info } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

interface FormErrors {
  userName?: string;
  userEmail?: string;
  partnerName?: string;
  partnerEmail?: string;
}

const PRODUCT_PRICE = 29;

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

  const { answers, saveAllAnswers, surveyConfig } = useSurvey();
  
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
          price: PRODUCT_PRICE,
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
      
      // Save survey responses
      const responsesSaved = await saveAllAnswers(orderData.id, 'user');
      
      if (!responsesSaved) {
        console.error('Failed to save survey responses');
        toast.error('Wystąpił błąd podczas zapisywania odpowiedzi z ankiety. Spróbuj ponownie później.');
        setIsProcessing(false);
        return;
      }
      
      // Call the create-payment function to initiate payment
      try {
        const { data, error } = await supabase.functions.invoke('create-payment', {
          body: {
            data: {
              price: PRODUCT_PRICE,
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
          throw new Error(`Payment function error: ${error.message}`);
        }
        
        if (data && data.url) {
          // Redirect to Stripe checkout page
          window.location.href = data.url;
        } else {
          throw new Error('No payment URL returned');
        }
      } catch (paymentError: any) {
        console.error('Payment error:', paymentError);
        toast.error('Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.');
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast.error('Wystąpił błąd podczas przetwarzania zamówienia. Spróbuj ponownie.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Dokończ zamówienie 👋</h1>
            <div className="mt-4 bg-green-50 text-green-800 rounded-md py-2 px-4 flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <p>Raport dostępny za jedyne {PRODUCT_PRICE} zł</p>
            </div>
            <p className="mt-4 text-gray-600">
              Czas zaprosić do gry Twoją drugą połówkę. Na końcu poznacie Wasze ukryte pragnienia.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={handleChange}
              required
              placeholder="Twoje imię"
              className="w-full"
            />
            {showErrors && errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
            
            <Input
              type="email"
              id="userEmail"
              name="userEmail"
              value={userEmail}
              onChange={handleChange}
              required
              placeholder="Twój e-mail (tam wyślemy raport)"
              className="w-full"
            />
            {showErrors && errors.userEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>
            )}
            
            <Input
              type="text"
              id="partnerName"
              name="partnerName"
              value={partnerName}
              onChange={handleChange}
              required
              placeholder="Imię Twojej partnerki/partnera"
              className="w-full"
            />
            {showErrors && errors.partnerName && (
              <p className="text-red-500 text-sm mt-1">{errors.partnerName}</p>
            )}
            
            <Input
              type="email"
              id="partnerEmail"
              name="partnerEmail"
              value={partnerEmail}
              onChange={handleChange}
              required
              placeholder="E-mail partnerki/partnera (tam wyślemy zaproszenie)"
              className="w-full"
            />
            {showErrors && errors.partnerEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.partnerEmail}</p>
            )}
            
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <Checkbox
                  id="giftWrap"
                  name="giftWrap"
                  checked={giftWrap}
                  onCheckedChange={(checked) => setGiftWrap(checked === true)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="giftWrap" className="font-medium text-gray-700 cursor-pointer flex items-center">
                  Zapakuj na prezent (bezpłatnie)
                  <Info className="h-4 w-4 ml-1 text-gray-400" />
                </label>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              Grając, akceptujesz przyjazny <a href="#" className="text-primary">Regulamin</a> i <a href="#" className="text-primary">Politykę Prywatności</a>, która gwarantuje bezpieczeństwo Waszych danych. Usuniemy je po 7 dniach.
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isProcessing} 
                className="w-full py-6 bg-red-900 hover:bg-red-800 text-white font-medium text-base"
              >
                {isProcessing ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Przetwarzanie...</>
                ) : (
                  <>Zapłać {PRODUCT_PRICE} zł</>
                )}
              </Button>
            </div>
            
            <div className="flex justify-center pt-2">
              <Link 
                to="/survey" 
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Wróć do ankiety
              </Link>
            </div>
            
            <div className="text-center text-xs text-gray-500 pt-4">
              Płatność jest zabezpieczona szyfrowaniem SSL
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
