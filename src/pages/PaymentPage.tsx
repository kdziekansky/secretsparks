import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from '@/components/ui/checkbox';
import EmailPreview from '../components/EmailPreview';

interface FormErrors {
  userName?: string;
  userEmail?: string;
  partnerName?: string;
  partnerEmail?: string;
  ageConfirmation?: string;
}

// Fixed product price at 29 zł, gift wrapping is free
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
    // Better email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Form validation with better sanitization
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
      
      // IMPORTANT: First save question sequence to order!
      const questionSequence = filteredQuestions.map(q => q.id);
      console.log('Saving question sequence to orders table:', questionSequence);
      
      // Save question sequence to orders table
      const { error: sequenceError } = await supabase
        .from('orders')
        .update({ user_question_sequence: questionSequence })
        .eq('id', orderId);
        
      if (sequenceError) {
        console.error('Error saving question sequence:', sequenceError);
        // Continue even if there's an error saving the sequence
      } else {
        console.log('Question sequence saved successfully');
      }
      
      // Prepare responses to save
      const responsesToSave = Object.entries(answers).map(([questionId, answer]) => ({
        order_id: orderId,
        question_id: questionId,
        answer: answer,
        user_type: 'user',  // CRITICAL: Always set user_type to 'user' for the orderer
        user_gender: safeConfig.userGender,
        partner_gender: safeConfig.partnerGender,
        game_level: safeConfig.gameLevel
      }));
      
      console.log('Preparing to save responses:', responsesToSave);
      
      // First approach: Try saving responses with insert
      console.log('Attempting to save responses using INSERT');
      const { error } = await supabase
        .from('survey_responses')
        .insert(responsesToSave);
        
      if (error) {
        console.error('Error saving survey responses with INSERT:', error);
        
        // Second approach: Try saving with upsert if insert failed
        console.log('Falling back to UPSERT method');
        const { error: upsertError } = await supabase
          .from('survey_responses')
          .upsert(responsesToSave, { onConflict: 'order_id,question_id,user_type' });
          
        if (upsertError) {
          console.error('Error saving survey responses with UPSERT:', upsertError);
          toast.error('Wystąpił błąd podczas zapisywania odpowiedzi z ankiety');
          
          // Try an even more direct approach - one by one
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
    
    // Sanitize data before saving
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
      
      // Add validation before sending to Supabase
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
          price: PRODUCT_PRICE, // Gift wrapping is now free
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
      
      // Proceed to create payment
      try {
        // Order information
        const price = PRODUCT_PRICE; // Gift wrapping is free now
        
        const paymentData = {
          price: price,
          currency: 'pln',
          user_name: sanitizedUserName,
          user_email: sanitizedUserEmail,
          partner_name: sanitizedPartnerName,
          partner_email: sanitizedPartnerEmail,
          gift_wrap: giftWrap,
          order_id: orderData.id
        };

        console.log('Preparing payment data:', {
          ...paymentData,
          user_email: '***@***.com',
          partner_email: '***@***.com'
        });

        // TEMPORARY SOLUTION: For tests, we can use a static Stripe URL
        // Uncomment the code below to bypass the Edge Function and test the rest of the process
        /*
        const mockStripeUrl = 'https://checkout.stripe.com/c/pay/cs_test_123456789';
        console.log('TEST MODE: Using mock Stripe URL:', mockStripeUrl);
        window.location.href = mockStripeUrl;
        return;
        */

        // Call Edge Function using standard fetch API
        console.log('Calling Edge Function with fetch...');
        
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bqbgrjpxufblrgcoxpfk.supabase.co';
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxYmdyanB4dWZibHJnY294cGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1Mzk4NzUsImV4cCI6MjA1NzExNTg3NX0.kSryhe5Z4BILp_ss5LpSxanGSvx4HZzZtVzYia4bgik";
        
        // Simplified data format for Edge Function
        const requestPayload = {
          data: paymentData
        };
        
        console.log('Sending request to:', `${supabaseUrl}/functions/v1/create-payment`);
        console.log('With payload:', JSON.stringify(requestPayload));
        
        const response = await fetch(`${supabaseUrl}/functions/v1/create-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'apikey': supabaseKey
          },
          body: JSON.stringify(requestPayload)
        });
        
        // Check response status
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));
        
        // Get raw response text for better diagnostics
        const responseText = await response.text();
        console.log('Response as text (first 100 chars):', responseText.substring(0, 100));
        
        // Try parsing JSON
        let data;
        try {
          data = JSON.parse(responseText);
          console.log('Response as object:', data);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError.message);
          throw new Error(`Invalid response format: ${responseText.substring(0, 200)}...`);
        }
        
        // Check response content
        if (!data) {
          throw new Error('No data in response');
        }
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        if (!data.url) {
          throw new Error('No payment URL in response: ' + JSON.stringify(data));
        }
        
        // Update order with payment session ID
        if (data.sessionId) {
          try {
            const { error: updateError } = await supabase
              .from('orders')
              .update({ payment_id: data.sessionId })
              .eq('id', orderData.id);
              
            if (updateError) {
              console.error('Error updating order with payment ID:', updateError);
            } else {
              console.log('Updated order with payment session ID:', data.sessionId);
            }
          } catch (updateError) {
            console.error('Exception updating order:', updateError);
          }
        }
        
        // Redirect to Stripe
        console.log('Redirecting to payment URL:', data.url);
        window.location.href = data.url;
        
      } catch (paymentError) {
        console.error('Payment creation error:', paymentError);
        toast.error(`Payment error: ${paymentError.message || 'Unknown error'}`);
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast.error(error.message || 'An error occurred while processing your order. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05050a] p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Prawie gotowe 👋</h1>
          <p className="text-lg text-muted-foreground mb-2">
            Czas zaprosić do gry Twoją partnerkę. Na końcu poznacie Wasze ukryte pragnienia.
          </p>
          <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">
            96% par rekomenduje tę grę
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form */}
          <div className="flex-1">
            <Card className="shadow-lg rounded-lg border-border bg-card/60 backdrop-blur">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-foreground">Dane zamówienia</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Wypełnij dane, aby kontynuować
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userName" className="text-foreground">Twoje imię</Label>
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
                      <Label htmlFor="userEmail" className="text-foreground">Twój e-mail (tam wyślemy raport)</Label>
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
                      <Label htmlFor="partnerName" className="text-foreground">Imię Twojej partnerki</Label>
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
                      <Label htmlFor="partnerEmail" className="text-foreground">E-mail Twojej partnerki</Label>
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
                      <Label htmlFor="giftWrap" className="cursor-pointer text-foreground">
                        Zapakuj na prezent (gratis)
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4 p-3 rounded-md border border-border">
                      <Checkbox 
                        id="ageConfirmation"
                        checked={ageConfirmed}
                        onCheckedChange={(checked) => setAgeConfirmed(checked as boolean)}
                      />
                      <Label htmlFor="ageConfirmation" className="cursor-pointer text-foreground font-medium">
                        Oświadczam, że ukończyłem/-am 18 rok życia
                      </Label>
                    </div>
                    
                    {showErrors && errors.ageConfirmation && (
                      <p className="text-red-500 text-sm mt-1">{errors.ageConfirmation}</p>
                    )}
                    
                    <div className="mt-6">
                      <Button type="submit" disabled={isProcessing} className="w-full text-lg py-6">
                        {isProcessing ? (
                          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Przetwarzanie...</>
                        ) : (
                          <>Zapłać {PRODUCT_PRICE} zł</>
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Grając, akceptujesz przyjazny{" "}
                      <a href="/regulamin" className="text-primary hover:underline">
                        Regulamin
                      </a>{" "}
                      i{" "}
                      <a href="/polityka-prywatnosci" className="text-primary hover:underline">
                        Politykę Prywatności
                      </a>
                      , która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Email Preview */}
          <div className="flex-1">
            <EmailPreview 
              to={partnerEmail || "email@partnera.com"}
              userName={userName || "Użytkownik"}
              partnerName={partnerName || "Partner"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
