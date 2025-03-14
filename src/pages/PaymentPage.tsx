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
import { Gift, Info, Loader2 } from 'lucide-react';

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
  const [sendNow, setSendNow] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { answers, surveyConfig, filteredQuestions, saveAnswer } = useSurvey();
  
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
      
      const { error: sequenceError } = await supabase
        .from('orders')
        .update({ user_question_sequence: questionSequence })
        .eq('id', orderId);
        
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
      const { error } = await supabase
        .from('survey_responses')
        .insert(responsesToSave);
        
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
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_name: sanitizedUserName,
          user_email: sanitizedUserEmail,
          partner_name: sanitizedPartnerName,
          partner_email: sanitizedPartnerEmail,
          gift_wrap: giftWrap,
          price: PRODUCT_PRICE,
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
          await supabase
            .from('orders')
            .update({ payment_id: data.sessionId })
            .eq('id', orderData.id);
            
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

  return (
    <div className="min-h-screen bg-[#05050a]">
      <div className="container mx-auto py-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/lovable-uploads/0537e49e-f4b0-49a8-bedb-41f3876d6f50.png" alt="Secret Sparks Logo" className="h-16" />
        </div>
        
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="w-full lg:w-1/2">
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white flex items-center">
                  Co raz bliżej <span className="text-red-500 ml-2">❤️</span>
                </h1>
                <p className="text-gray-300 mb-3">
                  Czas zaprosić do gry Twoją partnerkę. Na końcu poznacie Wasze ukryte pragnienia.
                </p>
                <p className="text-gray-400 text-sm">
                  Wszystkie dane są bezpieczne
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input 
                  placeholder="Twoje imię"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500"
                />
                
                <Input 
                  placeholder="Twój e-mail (tam wyślemy raport)"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500"
                />
                
                <Input 
                  placeholder="Imię Twojej partnerki/partnera"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500"
                />
                
                <Input 
                  placeholder="E-mail partnerki/partnera (tam wyślemy zaproszenie)"
                  type="email"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  className="bg-[#111] border-[#333] rounded-md p-4 h-12 text-white placeholder-gray-500"
                />
                
                {/* Timing options */}
                <div className="bg-[#111] border border-[#333] rounded-md p-4">
                  <p className="font-medium text-white mb-2">Kiedy wysłać zaproszenie?</p>
                  <div className="flex gap-8 text-gray-300">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio"
                        checked={sendNow}
                        onChange={() => setSendNow(true)}
                        className="accent-primary w-4 h-4"
                      />
                      <span>teraz</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio"
                        checked={!sendNow}
                        onChange={() => setSendNow(false)}
                        className="accent-primary w-4 h-4"
                      />
                      <span>chcę wybrać</span>
                    </label>
                  </div>
                </div>
                
                {/* Gift option */}
                <div className="flex items-center bg-[#111] border border-[#333] rounded-md p-4 gap-3">
                  <Checkbox 
                    id="giftWrap" 
                    checked={giftWrap}
                    onCheckedChange={(checked) => setGiftWrap(!!checked)}
                    className="h-4 w-4 border-white/40"
                  />
                  <Gift className="h-5 w-5 text-yellow-500" />
                  <Label htmlFor="giftWrap" className="text-white cursor-pointer flex-grow">
                    Zapakuj na prezent (bezpłatnie)
                  </Label>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </div>
                
                {/* Terms and Conditions */}
                <div className="flex items-center gap-3 pt-3">
                  <Checkbox 
                    id="ageConfirmation" 
                    checked={ageConfirmed}
                    onCheckedChange={(checked) => setAgeConfirmed(!!checked)}
                    className="h-4 w-4 border-white/40"
                  />
                  <Label htmlFor="ageConfirmation" className="text-gray-300 text-sm cursor-pointer">
                    Grając, akceptujesz przyjazny <Link to="/regulamin" className="text-primary hover:underline">Regulamin</Link> i <Link to="/polityka-prywatnosci" className="text-primary hover:underline">Politykę Prywatności</Link>, która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
                  </Label>
                </div>
                
                <Button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-full text-lg mt-6"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Przetwarzanie...
                    </>
                  ) : (
                    <>Zapłać {PRODUCT_PRICE} {CURRENCY}</>
                  )}
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
                    <span className="text-white">{partnerEmail || 'Imię <email@gmail.com>'}</span>
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
                    
                    <div className="flex justify-center mt-6">
                      <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md">
                        Rozpocznij ankietę
                      </button>
                    </div>
                    
                    <div className="text-center text-sm text-gray-400 mt-6">
                      <p>Pozdrawiamy,<br/>Zespół Secret Sparks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
