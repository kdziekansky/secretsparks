import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Gift, Lock, Info, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion'; // Zakładamy, że framer-motion jest zainstalowany dla animacji

// Fixed product price at 29 zł, gift wrapping is free
const PRODUCT_PRICE = 29;

const PaymentPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { answers, surveyConfig, filteredQuestions, saveAnswer } = useSurvey();
  
  // Validate form on input change
  useEffect(() => {
    validateField('userName', userName);
    validateField('userEmail', userEmail);
    validateField('partnerName', partnerName);
    validateField('partnerEmail', partnerEmail);
  }, [userName, userEmail, partnerName, partnerEmail]);

  // Field validation logic
  const validateField = (field: string, value: string) => {
    if (!touched[field]) return;
    
    let newErrors = { ...errors };
    
    switch (field) {
      case 'userName':
      case 'partnerName':
        if (!value.trim()) {
          newErrors[field] = 'Pole jest wymagane';
        } else {
          delete newErrors[field];
        }
        break;
      case 'userEmail':
      case 'partnerEmail':
        if (!value.trim()) {
          newErrors[field] = 'Pole jest wymagane';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[field] = 'Niepoprawny format emaila';
        } else {
          delete newErrors[field];
        }
        break;
    }
    
    setErrors(newErrors);
  };

  // Mark field as touched on blur
  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, field === 'userName' ? userName : 
                          field === 'userEmail' ? userEmail : 
                          field === 'partnerName' ? partnerName : partnerEmail);
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
    
    // Set all fields as touched to show validation errors
    const allFields = { userName: true, userEmail: true, partnerName: true, partnerEmail: true };
    setTouched(allFields);
    
    // Validate all fields
    validateField('userName', userName);
    validateField('userEmail', userEmail);
    validateField('partnerName', partnerName);
    validateField('partnerEmail', partnerEmail);
    
    // Check if any errors exist
    if (Object.keys(errors).length > 0) {
      toast.error('Proszę poprawić błędy w formularzu');
      return;
    }
    
    // Check if age is confirmed
    if (!ageConfirmed) {
      toast.error('Proszę zaakceptować regulamin');
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
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 to-black text-white">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src="/logo.svg" alt="Logo" className="h-16" />
        </div>
        
        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left column - Form */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <h1 className="text-4xl font-bold mb-3 flex items-center">
                Co raz bliżej <span className="text-red-500 ml-2">❤️</span>
              </h1>
              <p className="text-gray-300 mb-4 text-lg">
                Czas zaprosić do gry Twoją partnerkę. Na końcu poznacie Wasze ukryte pragnienia.
              </p>
              <div className="flex items-center text-sm text-gray-400 mt-2">
                <Lock className="h-4 w-4 mr-1.5" />
                <span>Wszystkie dane są bezpieczne</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                {/* Your name */}
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="text"
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      onBlur={() => handleBlur('userName')}
                      required
                      placeholder="Twoje imię"
                      className={`bg-gray-900/50 border-gray-700 rounded-lg py-6 px-4 text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary ${
                        errors.userName ? 'border-red-500' : 'border-gray-700'
                      }`}
                    />
                    {errors.userName && (
                      <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                    )}
                  </div>
                </div>
                
                {/* Your email */}
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="email"
                      id="userEmail"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      onBlur={() => handleBlur('userEmail')}
                      required
                      placeholder="Twój e-mail (tam wyślemy raport)"
                      className={`bg-gray-900/50 border-gray-700 rounded-lg py-6 px-4 text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary ${
                        errors.userEmail ? 'border-red-500' : 'border-gray-700'
                      }`}
                    />
                    {errors.userEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>
                    )}
                  </div>
                </div>
                
                {/* Partner name */}
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="text"
                      id="partnerName"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      onBlur={() => handleBlur('partnerName')}
                      required
                      placeholder="Imię Twojej partnerki"
                      className={`bg-gray-900/50 border-gray-700 rounded-lg py-6 px-4 text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary ${
                        errors.partnerName ? 'border-red-500' : 'border-gray-700'
                      }`}
                    />
                    {errors.partnerName && (
                      <p className="text-red-500 text-sm mt-1">{errors.partnerName}</p>
                    )}
                  </div>
                </div>
                
                {/* Partner email */}
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="email"
                      id="partnerEmail"
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      onBlur={() => handleBlur('partnerEmail')}
                      required
                      placeholder="E-mail partnerki (tam wyślemy zaproszenie)"
                      className={`bg-gray-900/50 border-gray-700 rounded-lg py-6 px-4 text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary ${
                        errors.partnerEmail ? 'border-red-500' : 'border-gray-700'
                      }`}
                    />
                    {errors.partnerEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.partnerEmail}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Gift option */}
              <div className="flex items-center space-x-3 p-4 bg-gray-900/40 rounded-xl border border-gray-800/50 hover:bg-gray-900/60 transition-colors">
                <Checkbox 
                  id="giftWrap"
                  checked={giftWrap}
                  onCheckedChange={(checked) => setGiftWrap(!!checked)}
                  className="bg-gray-800 border-gray-600 text-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
                <div className="flex items-center cursor-pointer" onClick={() => setGiftWrap(!giftWrap)}>
                  <Gift className="h-5 w-5 text-red-500 mr-2" />
                  <Label htmlFor="giftWrap" className="font-medium cursor-pointer">
                    Zapakuj na prezent (bezpłatnie)
                  </Label>
                </div>
              </div>
              
              {/* Terms acceptance */}
              <div className="flex items-start space-x-3 p-4 bg-gray-900/40 rounded-xl border border-gray-800/50">
                <div className="mt-1">
                  <Checkbox 
                    id="ageConfirmation"
                    checked={ageConfirmed}
                    onCheckedChange={(checked) => setAgeConfirmed(!!checked)}
                    className="bg-gray-800 border-gray-600 text-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="ageConfirmation" className="cursor-pointer text-gray-300">
                    Grając, akceptujesz przyjazny <Link to="/regulamin" className="text-primary hover:underline transition-colors">Regulamin</Link> i <Link to="/polityka-prywatnosci" className="text-primary hover:underline transition-colors">Politykę Prywatności</Link>, która gwarantuje bezpieczeństwo Waszych danych. Usuwamy je po 7 dniach.
                  </Label>
                </div>
              </div>
              
              {/* Submit button */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="mt-6"
              >
                <Button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-6 rounded-full text-lg shadow-lg shadow-red-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                      Przetwarzanie...
                    </div>
                  ) : (
                    'Zapłać'
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
          
          {/* Right column - Email preview */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-b from-gray-900 to-black shadow-xl">
              {/* Email header */}
              <div className="bg-gray-800 py-3 px-4 text-center text-sm font-medium border-b border-gray-700">
                TA WIADOMOŚĆ ZOSTANIE WYSŁANA DO PARTNERKI/PARTNERA
              </div>
              
              {/* Email metadata */}
              <div className="border-b border-gray-800 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Od</span>
                  <span className="font-medium">Gra Privé</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Do</span>
                  <span className="font-medium">
                    {partnerName || "Imię"} {partnerEmail ? `<${partnerEmail}>` : "<email@gmail.com>"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Temat</span>
                  <div className="flex items-center">
                    <span className="text-amber-500 mr-2">🔸</span>
                    <span className="font-medium">Ktoś zaprasza Cię do gry</span>
                  </div>
                </div>
              </div>
              
              {/* Email content */}
              <div className="p-6 space-y-4">
                <p className="text-lg">Cześć,</p>
                
                <p>
                  {userName || "Twój partner"} zaprosił(a) Cię do gry Secret Sparks – wyjątkowego doświadczenia, które pomoże Wam <span className="text-red-500">odkryć wspólne pragnienia i fantazje</span>, o których może nawet nie wiedzieliście.
                </p>
                
                <div className="bg-gray-900/50 border-l-4 border-red-500 pl-4 py-3 rounded-r-md">
                  <h3 className="font-semibold mb-2">Jak to działa?</h3>
                  <p className="text-gray-300 text-sm">
                    Odpowiadasz na kilka pytań o swoich preferencjach i zainteresowaniach. {userName || "Twój partner"} już wypełnił(a) swoją ankietę. Na podstawie Waszych odpowiedzi stworzymy spersonalizowany raport pokazujący tylko te aktywności i fantazje, które oboje uznaliście za atrakcyjne.
                  </p>
                </div>
                
                <p className="pb-2">
                  Twoje odpowiedzi są <strong>całkowicie poufne</strong> – nigdy nie zobaczy Twoich indywidualnych wyborów, a jedynie wspólne dopasowania w raporcie końcowym.
                </p>
                
                <div className="flex justify-center pt-2 pb-4">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-md shadow-md transition-colors">
                    Rozpocznij ankietę
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-400 pt-3 border-t border-gray-800">
                  <p>
                    Pozdrawiamy,<br/>
                    Zespół Secret Sparks
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
