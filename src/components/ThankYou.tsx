import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Info, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSurvey } from '@/contexts/SurveyContext';

// Stała przechowująca cenę - można łatwo zmienić w jednym miejscu
const REPORT_PRICE = 29;
const CURRENCY = 'zł';

const ThankYou: React.FC = () => {
  const { resetSurvey } = useSurvey();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    partnerName: '',
    partnerEmail: '',
    sendNow: true,
    giftWrap: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Przygotowanie danych do przekazania do Stripe
    const paymentData = {
      price: REPORT_PRICE,
      currency: CURRENCY,
      product: 'Secret Sparks Report',
      customer: {
        name: formData.userName,
        email: formData.userEmail
      },
      partner: {
        name: formData.partnerName,
        email: formData.partnerEmail
      },
      sendNow: formData.sendNow,
      giftWrap: formData.giftWrap
    };
    
    console.log('Payment data for Stripe:', paymentData);
    
    // Tutaj byłoby przekierowanie do Stripe
    alert(`Przejście do płatności - kwota: ${REPORT_PRICE} ${CURRENCY}`);
  };
  
  // Funkcja do powrotu do ankiety z usunięciem flagi thank-you
  const handleReturnToSurvey = () => {
    window.location.href = '/survey';
  };
  
  // Jeśli jeszcze nie pokazujemy formularza płatności, pokaż ekran podziękowania
  if (!showPaymentForm) {
    return (
      <div className="glass-panel p-8 w-full max-w-xl text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 h-16 w-16" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-medium mb-4">
          Dziękujemy za wypełnienie ankiety!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Twoje odpowiedzi zostały zapisane. Aby otrzymać raport, przejdź do płatności.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={resetSurvey} variant="outline">
            Wypełnij ponownie
          </Button>
          
          <Button 
            onClick={() => setShowPaymentForm(true)} 
            style={{ backgroundColor: '#800000' }}
            className="flex items-center gap-2"
          >
            <span>Otrzymaj raport ({REPORT_PRICE} {CURRENCY})</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  
  // Pokaż formularz płatności
  return (
    <div className="glass-panel p-8 w-full max-w-4xl animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lewa kolumna - formularz */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-2">Prawie gotowe 👋</h1>
          <p className="text-gray-600 mb-6">
            Czas zaprosić do gry Twoją drugą połówkę. Na końcu poznacie Wasze ukryte pragnienia.
          </p>
          
          <div className="text-lg font-semibold mb-2">
            <span className="text-pink-600">96% par rekomenduje tę grę</span>
          </div>
          
          <div className="mb-6 flex items-center p-3 bg-green-50 rounded-md text-green-800">
            <ShieldCheck className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">Raport dostępny za jedyne <strong>{REPORT_PRICE} {CURRENCY}</strong></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="userName"
              placeholder="Twoje imię"
              value={formData.userName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded"
            />
            
            <Input
              name="userEmail"
              type="email"
              placeholder="Twój e-mail (tam wyślemy raport)"
              value={formData.userEmail}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded"
            />
            
            <Input
              name="partnerName"
              placeholder="Imię Twojej partnerki/partnera"
              value={formData.partnerName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded"
            />
            
            <Input
              name="partnerEmail"
              type="email"
              placeholder="E-mail partnerki/partnera (tam wyślemy zaproszenie)"
              value={formData.partnerEmail}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded"
            />

            <div className="p-4 bg-gray-100 rounded-md">
              <div className="font-medium mb-2">Kiedy wysłać zaproszenie?</div>
              
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={formData.sendNow} 
                    onChange={() => handleRadioChange('sendNow', true)}
                    className="w-4 h-4 accent-purple-800"
                  />
                  <span>teraz</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={!formData.sendNow} 
                    onChange={() => handleRadioChange('sendNow', false)}
                    className="w-4 h-4 accent-purple-800"
                  />
                  <span>chcę wybrać</span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-gray-100 rounded-md flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.giftWrap}
                onChange={() => handleRadioChange('giftWrap', !formData.giftWrap)}
                className="w-4 h-4 accent-purple-800"
              />
              <Gift className="text-yellow-600 w-5 h-5" />
              <span>Zapakuj na prezent (bezpłatnie)</span>
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </div>

            <div className="text-xs text-gray-600 mt-4">
              Grając, akceptujesz przyjazny <a href="#" className="underline">Regulamin</a> i <a href="#" className="underline">Politykę Prywatności</a>, która gwarantuje bezpieczeństwo Waszych danych. Usuniemy je po 7 dniach.
            </div>

            <div className="flex flex-col sm:flex-row mt-6">
              <Button
                type="submit"
                className="w-full sm:w-auto px-10 py-3 rounded-full"
                style={{ backgroundColor: '#800000' }}
              >
                Zapłać {REPORT_PRICE} {CURRENCY}
              </Button>
              
              <Button
                type="button" 
                variant="outline"
                onClick={() => setShowPaymentForm(false)}
                className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2"
              >
                Wróć
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-4">
              Płatność jest zabezpieczona szyfrowaniem SSL
            </div>
          </form>
        </div>

        {/* Prawa kolumna - podgląd wiadomości */}
        <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <div className="text-center text-sm text-gray-500 mb-4">
            TA WIADOMOŚĆ ZOSTANIE WYSŁANA
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-700 text-white p-3 font-medium">
              Nowa wiadomość
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex">
                <div className="w-1/6 font-medium">Od</div>
                <div className="w-5/6">Secret Sparks</div>
              </div>
              
              <div className="flex">
                <div className="w-1/6 font-medium">Do</div>
                <div className="w-5/6">
                  {formData.partnerEmail || 'Imię <email@gmail.com>'}
                </div>
              </div>
              
              <div className="flex">
                <div className="w-1/6 font-medium">Temat</div>
                <div className="w-5/6">
                  <span className="text-red-500">🔔</span> {formData.userName || 'Ktoś'} zaprasza Cię do gry
                </div>
              </div>
              
              <div className="flex">
                <div className="w-1/6 font-medium">Cześć</div>
                <div className="w-5/6">❤️</div>
              </div>
              
              <div className="pt-4">
                <p className="mb-4">
                  {formData.userName ? `${formData.userName}` : 'Twój partner'} zaprosił Cię do najbardziej ekscytującej gry we wszechświecie.
                </p>
                
                <p className="mb-4">
                  Kliknij przycisk poniżej i szczerze odpowiedz na pytania.
                  Gwarantujemy, że Twój partner nie pozna Twoich odpowiedzi. Z pomocą sztucznej inteligencji przeanalizujemy Wasze odpowiedzi i przygotujemy dla Was raport z gry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;