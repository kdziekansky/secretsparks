import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from '@/components/ui/checkbox';

interface FormErrors {
  userName?: string;
  userEmail?: string;
  partnerName?: string;
  partnerEmail?: string;
  ageConfirmation?: string;
}

const PRODUCT_PRICE = 29;

const PaymentPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { answers, surveyConfig, filteredQuestions } = useSurvey();
  
  // Check if survey is completed when component mounts
  useEffect(() => {
    const checkSurveyStatus = () => {
      const answersCount = Object.keys(answers).length;
      console.log('Current answers count:', answersCount);
      console.log('Current survey config:', surveyConfig);
      
      // Consider survey completed if there are answers or if coming back from payment with orderId
      if (answersCount > 0 || orderId) {
        setSurveyCompleted(true);
      } else {
        setSurveyCompleted(false);
      }
    };
    
    checkSurveyStatus();
  }, [answers, orderId, surveyConfig]);
  
  const isValidEmail = (email: string) => {
    // Bardziej rygorystyczna walidacja email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Walidacja pól formularza z lepszym sanityzowaniem
    if (!userName || userName.trim().length === 0) {
      newErrors.userName = 'Imię jest wymagane';
    } else if (userName.length > 100) {
      newErrors.userName = 'Imię jest za długie (maksymalnie 100 znaków)';
    }
    
    if (!userEmail || userEmail.trim().length === 0) {
      newErrors.userEmail = 'Email jest wymagany';
    } else if (!isValidEmail(userEmail)) {
      newErrors.userEmail = 'Nieprawidłowy format email';
    } else if (userEmail.length > 150) {
      newErrors.userEmail = 'Email jest za długi (maksymalnie 150 znaków)';
    }
    
    if (!partnerName || partnerName.trim().length === 0) {
      newErrors.partnerName = 'Imię partnera jest wymagane';
    } else if (partnerName.length > 100) {
      newErrors.partnerName = 'Imię partnera jest za długie (maksymalnie 100 znaków)';
    }
    
    if (!partnerEmail || partnerEmail.trim().length === 0) {
      newErrors.partnerEmail = 'Email partnera jest wymagany';
    } else if (!isValidEmail(partnerEmail)) {
      newErrors.partnerEmail = 'Nieprawidłowy format email partnera';
    } else if (partnerEmail.length > 150) {
      newErrors.partnerEmail = 'Email partnera jest za długi (maksymalnie 150 znaków)';
    }
    
    if (!ageConfirmed) {
      newErrors.ageConfirmation = 'Musisz potwierdzić, że ukończyłeś/-aś 18 lat';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      default:
        break;
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setGiftWrap(checked);
  };
  
  // Save survey responses before initiating payment
  const saveResponses = async (orderId: string) => {
    try {
      console.log('Saving user survey responses for order:', orderId);
      
      if (Object.keys(answers).length === 0) {
        console.warn('No answers to save! Skipping survey response saving.');
        return true; // Changed to true to allow order to proceed even without answers
      }
      
      // Debug diagnostyczny - sprawdź zawartość odpowiedzi
      console.log('DEBUG - Answers content:', JSON.stringify(answers));
      console.log('DEBUG - Number of answers:', Object.keys(answers).length);
      console.log('DEBUG - Filtered questions:', filteredQuestions.map(q => q.id));
      
      // Set default values for survey config if they're missing
      const safeConfig = {
        userGender: surveyConfig.userGender || 'unknown',
        partnerGender: surveyConfig.partnerGender || 'unknown',
        gameLevel: surveyConfig.gameLevel || 'discover'
      };
      
      console.log('Using survey config for responses:', safeConfig);
      
      // WAŻNE: Najpierw zapisz sekwencję pytań do zamówienia!
      const questionSequence = filteredQuestions.map(q => q.id);
      console.log('Saving question sequence to orders table:', questionSequence);
      
      // Zapisz sekwencję pytań do tabeli orders
      const { error: sequenceError } = await supabase
        .from('orders')
        .update({ user_question_sequence: questionSequence })
        .eq('id', orderId);
        
      if (sequenceError) {
        console.error('Error saving question sequence:', sequenceError);
        // Kontynuujemy nawet jeśli wystąpił błąd zapisywania sekwencji
      } else {
        console.log('Question sequence saved successfully');
      }
      
      // Przygotuj odpowiedzi do zapisania
      const responsesToSave = Object.entries(answers).map(([questionId, answer]) => ({
        order_id: orderId,
        question_id: questionId,
        answer: answer,
        user_type: 'user',  // KRYTYCZNE: Zawsze ustawiaj user_type na 'user' dla zamawiającego
        user_gender: safeConfig.userGender,
        partner_gender: safeConfig.partnerGender,
        game_level: safeConfig.gameLevel
      }));
      
      console.log('Preparing to save responses:', responsesToSave);
      
      // Pierwszy sposób: Próba zapisania odpowiedzi przez insert
      console.log('Attempting to save responses using INSERT');
      const { error } = await supabase
        .from('survey_responses')
        .insert(responsesToSave);
        
      if (error) {
        console.error('Error saving survey responses with INSERT:', error);
        
        // Drugi sposób: Próba zapisania przez upsert jeśli insert nie zadziałał
        console.log('Falling back to UPSERT method');
        const { error: upsertError } = await supabase
          .from('survey_responses')
          .upsert(responsesToSave, { onConflict: 'order_id,question_id,user_type' });
          
        if (upsertError) {
          console.error('Error saving survey responses with UPSERT:', upsertError);
          toast.error('Wystąpił błąd podczas zapisywania odpowiedzi z ankiety');
          
          // Spróbujmy jeszcze bardziej bezpośredni sposób - pojedynczo
          console.log('Trying to save responses one by one');
          let saveSuccess = true;
          
          for (const response of responsesToSave) {
            const { error: singleError } = await supabase
              .from('survey_responses')
              .insert([response]);
              
            if (singleError) {
              console.error(`Error saving response for question ${response.question_id}:`, singleError);
              saveSuccess = false;
            }
          }
          
          if (!saveSuccess) {
            console.error('Some responses failed to save individually');
            return false;
          } else {
            console.log('At least some responses saved individually');
            return true;
          }
        } else {
          console.log('Survey responses saved successfully using UPSERT');
          return true;
        }
      } else {
        console.log('Survey responses saved successfully using INSERT');
        return true;
      }
    } catch (error) {
      console.error('Failed to save survey responses:', error);
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setShowErrors(true);
      return;
    }
    
    // Sanityzacja danych przed zapisem
    const sanitizedUserName = userName.trim().substring(0, 100);
    const sanitizedUserEmail = userEmail.trim().toLowerCase().substring(0, 150);
    const sanitizedPartnerName = partnerName.trim().substring(0, 100);
    const sanitizedPartnerEmail = partnerEmail.trim().toLowerCase().substring(0, 150);
    
    // Set default values for survey config
    const safeConfig = {
      userGender: surveyConfig.userGender || 'unknown',
      partnerGender: surveyConfig.partnerGender || 'unknown',
      gameLevel: surveyConfig.gameLevel || 'discover'
    };
    
    console.log('Using survey config for order:', safeConfig);
    
    if (!surveyCompleted && Object.keys(answers).length === 0 && !orderId) {
      console.warn('Survey not completed, but proceeding for testing purposes');
    }
    
    setIsProcessing(true);
    
    try {
      console.log('Creating order in database');
      
      // Dodanie walidacji przed wysłaniem do Supabase
      if (!sanitizedUserEmail || !sanitizedPartnerEmail) {
        throw new Error('Brak wymaganych danych: email użytkownika lub partnera');
      }
      
      // Also save survey configuration to orders table
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_name: sanitizedUserName,
          user_email: sanitizedUserEmail,
          partner_name: sanitizedPartnerName,
          partner_email: sanitizedPartnerEmail,
          gift_wrap: giftWrap,
          price: PRODUCT_PRICE + (giftWrap ? 20 : 0),
          user_gender: safeConfig.userGender,
          partner_gender: safeConfig.partnerGender,
          game_level: safeConfig.gameLevel
        })
        .select()
        .single();
      
      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error('Nie udało się utworzyć zamówienia: ' + orderError.message);
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
      
      // Proceed to create payment using Supabase edge function with walidacją danych
      try {
        console.log('Creating payment for order:', orderData.id);
        
        // Sanityzacja i walidacja danych przed wysłaniem do funkcji edge
        if (!orderData.id || typeof orderData.id !== 'string') {
          throw new Error('Nieprawidłowe ID zamówienia');
        }
        
        const price = PRODUCT_PRICE + (giftWrap ? 20 : 0);
        if (isNaN(price) || price <= 0) {
          throw new Error('Nieprawidłowa kwota zamówienia');
        }
        
        const result = await supabase.functions.invoke('create-payment', {
          body: {
            data: {
              price: price,
              currency: 'pln',
              user_name: sanitizedUserName,
              user_email: sanitizedUserEmail,
              partner_name: sanitizedPartnerName,
              partner_email: sanitizedPartnerEmail,
              gift_wrap: giftWrap,
              order_id: orderData.id
            }
          }
        });
        
        console.log('Payment creation response:', result);
        
        // Lepsza obsługa błędów
        if (result.error) {
          console.error('Payment creation error:', result.error);
          throw new Error('Nie udało się utworzyć płatności: ' + (result.error.message || 'Nieznany błąd'));
        }
        
        const data = result.data;
        
        if (!data) {
          console.error('Payment API returned no data');
          throw new Error('Brak danych w odpowiedzi z API płatności');
        }
        
        if (data.error) {
          console.error('Payment API error:', data.error);
          throw new Error(data.error);
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
            // Kontynuujemy pomimo błędu, ponieważ nie jest to krytyczne
          }
        }
        
        // Bezpieczniejsze przekierowanie
        if (data.url.startsWith('https://checkout.stripe.com/')) {
          // Redirect to Stripe tylko gdy URL jest poprawny
          window.location.href = data.url;
        } else {
          console.error('Invalid Stripe URL:', data.url);
          throw new Error('Otrzymano nieprawidłowy URL płatności');
        }
      } catch (paymentError: any) {
        console.error('Payment creation failed:', paymentError);
        toast.error(paymentError.message || 'Wystąpił błąd podczas tworzenia płatności. Spróbuj ponownie.');
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast.error(error.message || 'Wystąpił błąd podczas przetwarzania zamówienia. Spróbuj ponownie.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-lg rounded-lg border-border bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-foreground">Podsumowanie zamówienia</CardTitle>
            <CardDescription className="text-muted-foreground text-center">Wypełnij dane, aby złożyć zamówienie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="userName" className="text-foreground">Imię</Label>
                <Input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={handleChange}
                  required
                  placeholder="Twoje imię"
                  className="bg-input text-foreground"
                />
                {showErrors && errors.userName && (
                  <p className="text-red-500 text-sm">{errors.userName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail" className="text-foreground">Email</Label>
                <Input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={userEmail}
                  onChange={handleChange}
                  required
                  placeholder="Twój email"
                  className="bg-input text-foreground"
                />
                {showErrors && errors.userEmail && (
                  <p className="text-red-500 text-sm">{errors.userEmail}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerName" className="text-foreground">Imię partnera/partnerki</Label>
                <Input
                  type="text"
                  id="partnerName"
                  name="partnerName"
                  value={partnerName}
                  onChange={handleChange}
                  required
                  placeholder="Imię Twojej drugiej połówki"
                  className="bg-input text-foreground"
                />
                {showErrors && errors.partnerName && (
                  <p className="text-red-500 text-sm">{errors.partnerName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerEmail" className="text-foreground">Email partnera/partnerki</Label>
                <Input
                  type="email"
                  id="partnerEmail"
                  name="partnerEmail"
                  value={partnerEmail}
                  onChange={handleChange}
                  required
                  placeholder="Email Twojej drugiej połówki"
                  className="bg-input text-foreground"
                />
                {showErrors && errors.partnerEmail && (
                  <p className="text-red-500 text-sm">{errors.partnerEmail}</p>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="giftWrap"
                  checked={giftWrap}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="giftWrap" className="cursor-pointer text-foreground">Zapakuj na prezent (+20zł)</Label>
              </div>
              <div className="flex items-center space-x-2 mt-4 p-3 rounded-md border border-border">
                <Checkbox 
                  id="ageConfirmation"
                  checked={ageConfirmed}
                  onCheckedChange={(checked) => setAgeConfirmed(checked as boolean)}
                />
                <Label htmlFor="ageConfirmation" className="cursor-pointer text-foreground font-medium">Oświadczam, że ukończyłem/-am 18 rok życia i wyrażam zgodę na oglądanie treści o charakterze jednoznacznie seksualnym</Label>
              </div>
              {showErrors && errors.ageConfirmation && (
                <p className="text-red-500 text-sm mt-1">{errors.ageConfirmation}</p>
              )}
              <div className="mt-6">
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
