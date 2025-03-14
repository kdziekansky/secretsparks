import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Info, AlertTriangle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// Fixed product price at 29 zł, gift wrapping is free
const PRODUCT_PRICE = 29;

const PaymentPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [sendInvitation, setSendInvitation] = useState('teraz'); // Zachowuję stan, ale ukrywam element UI
  const [isProcessing, setIsProcessing] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
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
      toast.error('Musisz potwierdzić, że masz ukończone 18 lat');
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
          order_id: orderData.id,
          send_invitation: sendInvitation
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.svg" alt="Logo" className="h-12 mb-4" />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Co raz bliżej ❤️</h1>
              <p className="text-muted-foreground mb-4">
                Czas zaprosić do gry Twoją partnerkę. Na końcu poznacie Wasze ukryte pragnienia.
              </p>
              <div className="text-primary font-semibold">
                <span className="text-muted-foreground">Wszystkie dane są bezpieczne</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  placeholder="Twoje imię"
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  id="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  placeholder="Twój e-mail (tam wyślemy raport)"
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  id="partnerName"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  required
                  placeholder="Imię Twojej partnerki"
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  id="partnerEmail"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  required
                  placeholder="E-mail partnerki (tam wyślemy zaproszenie)"
                  className="w-full"
                />
              </div>
              

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="giftWrap"
                  checked={giftWrap}
                  onCheckedChange={(checked) => setGiftWrap(!!checked)}
                  className="border-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="giftWrap" className="flex items-center">
                    <span className="mr-1">🎁</span> Zapakuj na prezent (bezpłatnie)
                  </Label>
                </div>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ageConfirmation"
                  checked={ageConfirmed}
                  onCheckedChange={(checked) => setAgeConfirmed(!!checked)}
                  className="border-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="ageConfirmation">
                    Grając, akceptujesz przyjazny <a href="/regulamin" className="text-primary hover:underline">Regulamin</a> i <a href="/polityka-prywatnosci" className="text-primary hover:underline">Politykę Prywatności</a>, która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
                  </Label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 rounded-full py-6 text-lg"
                disabled={isProcessing}
              >
                Zapłać
              </Button>
            </form>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="border rounded-md bg-black text-white overflow-hidden">
              <div className="p-3 text-center border-b border-gray-800 text-sm font-medium">
                TA WIADOMOŚĆ ZOSTANIE WYSŁANA DO PARTNERKI/PARTNERA
              </div>
              
              <div className="p-3 border-b border-gray-800">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-gray-400 text-sm">Od</div>
                  <div>Gra Privé</div>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-gray-400 text-sm">Do</div>
                  <div>Imię {partnerEmail ? `<${partnerEmail}>` : "<email@gmail.com>"}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-400 text-sm">Temat</div>
                  <div className="flex items-center">
                    <span className="text-red-500 mr-1">🔥</span> 
                    Ktoś zaprasza Cię do gry
                  </div>
                </div>
              </div>
              
              <div className="bg-black p-4">
                <div className="space-y-4">
                <p>Cześć,</p>
                
                <p>
                  Twój partner zaprosił(a) Cię do gry Secret Sparks – wyjątkowego doświadczenia, które pomoże Wam odkryć wspólne pragnienia i fantazje, o których może nawet nie wiedzieliście.
                </p>
                
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h3 className="font-medium mb-1">Jak to działa?</h3>
                  <p className="text-sm text-gray-300">
                    Odpowiadasz na kilka pytań o swoich preferencjach i zainteresowaniach. 
                    Twój partner już wypełnił(a) swoją ankietę. Na podstawie Waszych odpowiedzi 
                    stworzymy spersonalizowany raport pokazujący tylko te aktywności i fantazje, 
                    które oboje uznaliście za atrakcyjne.
                  </p>
                </div>
                
                <p>
                  Twoje odpowiedzi są <strong>całkowicie poufne</strong> – nigdy nie zobaczy Twoich 
                  indywidualnych wyborów, a jedynie wspólne dopasowania w raporcie końcowym.
                </p>
                
                <div className="flex justify-center">
                  <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded">
                    Rozpocznij ankietę
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-400 pt-4">
                  <p>Pozdrawiamy,<br/>Zespół Secret Sparks</p>
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
