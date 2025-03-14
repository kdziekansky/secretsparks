import React, { useState } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fixed product price at 29 zł, gift wrapping is free
const PRODUCT_PRICE = 29;

const PaymentPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { answers, surveyConfig, filteredQuestions } = useSurvey();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch(name) {
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
      
      const { error: sequenceError } = await supabase
        .from('orders')
        .update({ user_question_sequence: questionSequence })
        .eq('id', orderId);
        
      if (sequenceError) {
        console.error('Error saving question sequence:', sequenceError);
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
      const { error } = await supabase
        .from('survey_responses')
        .insert(responsesToSave);
        
      if (error) {
        console.error('Error saving survey responses:', error);
        return false;
      } 
      
      return true;
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
      // Sanitize data
      const sanitizedUserName = userName.trim().substring(0, 100);
      const sanitizedUserEmail = userEmail.trim().toLowerCase().substring(0, 150);
      const sanitizedPartnerName = partnerName.trim().substring(0, 100);
      const sanitizedPartnerEmail = partnerEmail.trim().toLowerCase().substring(0, 150);
      
      // Set default survey config values
      const safeConfig = {
        userGender: surveyConfig.userGender || 'unknown',
        partnerGender: surveyConfig.partnerGender || 'unknown',
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
        throw new Error('Nie udało się utworzyć zamówienia: ' + orderError.message);
      }
      
      // Save survey responses
      await saveResponses(orderData.id);
      
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

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bqbgrjpxufblrgcoxpfk.supabase.co';
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
        
        const requestPayload = {
          data: paymentData
        };
        
        const response = await fetch(`${supabaseUrl}/functions/v1/create-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'apikey': supabaseKey
          },
          body: JSON.stringify(requestPayload)
        });
        
        // Parse response
        const responseText = await response.text();
        
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (jsonError) {
          throw new Error(`Nieprawidłowy format odpowiedzi`);
        }
        
        if (!data || data.error) {
          throw new Error(data?.error || 'Brak danych w odpowiedzi');
        }
        
        if (!data.url) {
          throw new Error('Brak URL do płatności w odpowiedzi');
        }
        
        // Update order with payment session ID
        if (data.sessionId) {
          await supabase
            .from('orders')
            .update({ payment_id: data.sessionId })
            .eq('id', orderData.id);
        }
        
        // Redirect to Stripe
        window.location.href = data.url;
        
      } catch (paymentError: any) {
        toast.error(`Błąd płatności: ${paymentError.message || 'Nieznany błąd'}`);
        setIsProcessing(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'Wystąpił błąd podczas przetwarzania zamówienia.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-4 md:py-8">
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Logo" className="h-12" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lewa kolumna - formularz */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Co raz bliżej ❤️</h1>
              <p className="text-gray-400 mt-2">
                Czas zaprosić do gry Twoją partnerkę. Na końcu poznacie Wasze ukryte pragnienia.
              </p>
              <p className="text-gray-400 mt-2">
                Wszystkie dane są bezpieczne
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={handleInputChange}
                  placeholder="Twoje imię"
                  className="bg-black border-gray-700 rounded-md w-full"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  name="userEmail"
                  value={userEmail}
                  onChange={handleInputChange}
                  placeholder="Twój e-mail (tam wyślemy raport)"
                  className="bg-black border-gray-700 rounded-md w-full"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  name="partnerName"
                  value={partnerName}
                  onChange={handleInputChange}
                  placeholder="Imię Twojej partnerki"
                  className="bg-black border-gray-700 rounded-md w-full"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  name="partnerEmail"
                  value={partnerEmail}
                  onChange={handleInputChange}
                  placeholder="E-mail partnerki (tam wyślemy zaproszenie)"
                  className="bg-black border-gray-700 rounded-md w-full"
                  required
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="giftWrap" 
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="rounded border-gray-700"
                />
                <label htmlFor="giftWrap" className="text-sm cursor-pointer">
                  🎁 Zapakuj na prezent (bezpłatnie)
                </label>
              </div>
              
              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="ageConfirmation" 
                  checked={ageConfirmed}
                  onChange={(e) => setAgeConfirmed(e.target.checked)}
                  className="mt-1 rounded border-gray-700"
                />
                <label htmlFor="ageConfirmation" className="text-sm">
                  Grając, akceptujesz przyjazny <Link to="/regulamin" className="text-red-500 hover:underline">Regulamin</Link> i <Link to="/polityka-prywatnosci" className="text-red-500 hover:underline">Politykę Prywatności</Link>, która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
                </label>
              </div>
              
              <Button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition-colors"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Przetwarzanie...
                  </span>
                ) : (
                  'Zapłać'
                )}
              </Button>
            </form>
          </div>
          
          {/* Prawa kolumna - podgląd emaila */}
          <div className="rounded-md border border-gray-800 overflow-hidden">
            <div className="py-2 px-3 text-center border-b border-gray-800 text-sm font-medium">
              TA WIADOMOŚĆ ZOSTANIE WYSŁANA DO PARTNERKI/PARTNERA
            </div>
            
            <div className="p-3 border-b border-gray-800 bg-black">
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-400 text-sm">Od</div>
                <div>Gra Privé</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-400 text-sm">Do</div>
                <div>Imię {partnerEmail ? `<${partnerEmail}>` : "<email@gmail.com>"}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-400 text-sm">Temat</div>
                <div>
                  <span className="text-amber-500">🔸</span> Ktoś zaprasza Cię do gry
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <p className="text-gray-200">Cześć,</p>
              
              <p className="text-gray-200">
                Twój partner zaprosił(a) Cię do gry Secret Sparks – wyjątkowego doświadczenia, które pomoże Wam odkryć wspólne pragnienia i fantazje, o których może nawet nie wiedzieliście.
              </p>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-medium text-gray-200">Jak to działa?</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Odpowiadasz na kilka pytań o swoich preferencjach i zainteresowaniach. Twój partner już wypełnił(a) swoją ankietę. Na podstawie Waszych odpowiedzi stworzymy spersonalizowany raport pokazujący tylko te aktywności i fantazje, które oboje uznaliście za atrakcyjne.
                </p>
              </div>
              
              <p className="text-gray-200">
                Twoje odpowiedzi są <strong>całkowicie poufne</strong> – nigdy nie zobaczy Twoich indywidualnych wyborów, a jedynie wspólne dopasowania w raporcie końcowym.
              </p>
              
              <div className="text-center">
                <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded transition-colors">
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
  );
};

export default PaymentPage;
