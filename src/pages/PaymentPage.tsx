import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Gift, Info, Loader2, Shield, CheckCircle2, ArrowRightCircle } from 'lucide-react';

// Fixed product price at 29 zł, gift wrapping is free
const PRODUCT_PRICE = 29;
const CURRENCY = 'zł';
const PaymentPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  // Removed sendNow state as it's no longer needed
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const {
    answers,
    surveyConfig,
    filteredQuestions,
    saveAnswer
  } = useSurvey();

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!userName || !userEmail || !partnerName || !partnerEmail) {
      toast.error('Wypełnij wszystkie wymagane pola');
      return;
    }
    if (!ageConfirmed) {
      toast.error('Musisz potwierdzić, że akceptujesz regulamin');
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
        price: PRODUCT_PRICE,
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
          price: PRODUCT_PRICE,
          currency: 'pln',
          user_name: sanitizedUserName,
          user_email: sanitizedUserEmail,
          partner_name: sanitizedPartnerName,
          partner_email: sanitizedPartnerEmail,
          gift_wrap: giftWrap,
          order_id: orderData.id
        };
        console.log('Preparing payment data');
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bqbgrjpxufblrgcoxpfk.supabase.co';
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxYmdyanB4dWZibHJnY294cGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1Mzk4NzUsImV4cCI6MjA1NzExNTg3NX0.kSryhe5Z4BILp_ss5LpSxanGSvx4HZzZtVzYia4bgik";
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
        console.log('Response received');
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
        console.log('Redirecting to payment URL');
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
  return <div className="min-h-screen bg-[#05050a] flex flex-col items-center justify-start">
      <div className="container mx-auto py-12 px-4 w-full max-w-7xl">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src="/lovable-uploads/0537e49e-f4b0-49a8-bedb-41f3876d6f50.png" alt="Secret Sparks Logo" className="h-36" />
        </div>
        
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="w-full lg:w-1/2">
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white flex items-center">
                  To ostatni krok <span className="text-red-500 ml-2">❤️</span>
                </h1>
                <p className="text-gray-300 mb-3">
                  Czas zaprosić swoją partnerkę/-ra. Nie poznacie swoich odpowiedzi, ale odkryjecie siebie na nowo.
                </p>
                <p className="text-gray-400 text-sm flex items-center">
                  <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>
                  Wszystkie dane są bezpieczne. Zostaną usunięte po 7 dniach
                </p>
              </div>

              {/* Nowy element - gwarancja satysfakcji */}
              <div className="mb-6 p-4 border border-green-600/30 bg-green-600/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-green-400 text-lg mb-1">100% Gwarancja Satysfakcji</h3>
                    <p className="text-gray-300 text-sm">
                      Jeśli raport nie spełni Twoich oczekiwań, zwrócimy Ci pieniądze w ciągu 14 dni. 
                      Bez zbędnych pytań. To my podejmujemy całe ryzyko.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 bg-[#111] p-3 rounded-md">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm text-gray-300">
                    <p className="font-medium text-white">Bezpieczna płatność</p>
                    <p>SSL & 3D Secure</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-[#111] p-3 rounded-md">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm text-gray-300">
                    <p className="font-medium text-white">Setki zadowolonych par</p>
                    <p>już poznało treść raportu</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input placeholder="Twoje imię" value={userName} onChange={e => setUserName(e.target.value)} className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" />
                
                <Input placeholder="Twój e-mail (tam wyślemy raport)" type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" />
                
                <Input placeholder="Imię Twojej partnerki/partnera" value={partnerName} onChange={e => setPartnerName(e.target.value)} className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" />
                
                <Input placeholder="E-mail partnerki/partnera (tam wyślemy zaproszenie)" type="email" value={partnerEmail} onChange={e => setPartnerEmail(e.target.value)} className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500" />
                
                {/* Gift option */}
                
                
                {/* Terms and Conditions */}
                <div className="flex items-center gap-3 pt-3">
                  <Checkbox id="ageConfirmation" checked={ageConfirmed} onCheckedChange={checked => setAgeConfirmed(!!checked)} className="h-4 w-4 border-white/40" />
                  <Label htmlFor="ageConfirmation" className="text-gray-300 text-sm cursor-pointer">
                    Grając, akceptujesz przyjazny <Link to="/regulamin" className="text-primary hover:underline">Regulamin</Link> i <Link to="/polityka-prywatnosci" className="text-primary hover:underline">Politykę Prywatności</Link>, która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
                  </Label>
                </div>
                
                <Button type="submit" disabled={isProcessing} className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-full text-lg mt-6 flex items-center justify-center gap-2">
                  {isProcessing ? <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Przetwarzanie...
                    </> : <>
                      <span>Zapłać {PRODUCT_PRICE} {CURRENCY}</span>
                      <ArrowRightCircle className="h-5 w-5" />
                    </>}
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-2">
                  Płatność jest zabezpieczona szyfrowaniem SSL
                </p>
              </form>
            </div>
            
            {/* Email Preview Section */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg overflow-hidden border border-gray-800 bg-[#0D0D12] h-full">
                <div className="bg-[#0D0D12] text-center p-4 border-b border-gray-800">
                  <p className="text-gray-200 text-sm font-medium">TA WIADOMOŚĆ ZOSTANIE WYSŁANA DO PARTNERA/PARTNERKI</p>
                </div>
                
                <div className="p-4 border-b border-gray-800">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 text-sm">Od</span>
                    <span className="text-white">Secret Sparks</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 text-sm">Do</span>
                    <span className="text-white">{partnerName ? `${partnerName} <${partnerEmail || 'email@gmail.com'}>` : 'Imię <email@gmail.com>'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Temat</span>
                    <div className="flex items-center">
                      <span className="text-amber-500 mr-2">🔔</span>
                      <span className="text-white"> {userName || 'Ktoś'} zaprasza Cię do gry</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 text-gray-200">
                  <div className="space-y-4">
                    <p>Cześć,</p>
                    
                    <p>
                      {userName ? `${userName}` : 'Twój partner'} zaprosił(a) Cię do gry Secret Sparks – wyjątkowego doświadczenia, które pomoże Wam odkryć wspólne pragnienia i fantazje, o których może nawet nie wiedzieliście.
                    </p>
                    
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="font-medium mb-1">Jak to działa?</h3>
                      <p className="text-sm text-gray-300">
                        Odpowiadasz na kilka pytań o swoich preferencjach i zainteresowaniach. {userName ? userName : 'Twój partner'} już wypełnił(a) swoją ankietę. Na podstawie Waszych odpowiedzi stworzymy spersonalizowany raport pokazujący tylko te aktywności i fantazje, które oboje uznaliście za atrakcyjne.
                      </p>
                    </div>
                    
                    <p>
                      Twoje odpowiedzi są <strong>całkowicie poufne</strong> – nigdy nie zobaczy Twoich indywidualnych wyborów, a jedynie wspólne dopasowania w raporcie końcowym.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default PaymentPage;