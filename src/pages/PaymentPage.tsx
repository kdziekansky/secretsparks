import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Gift, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Stała przechowująca cenę - można łatwo zmienić w jednym miejscu
const REPORT_PRICE = 29;
const CURRENCY = 'zł';

const PaymentPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    partnerName: '',
    partnerEmail: '',
    giftWrap: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
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
      giftWrap: formData.giftWrap
    };
    
    console.log('Payment data for Stripe:', paymentData);
    
    // Tutaj byłoby przekierowanie do Stripe
    alert(`Przejście do płatności - kwota: ${REPORT_PRICE} ${CURRENCY}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="glass-panel w-full max-w-5xl animate-fade-in">
        <div className="flex flex-col lg:flex-row">
          {/* Lewa kolumna - formularz */}
          <div className="lg:w-1/2 p-8">
            <h1 className="text-2xl font-bold mb-2">Dokończ zamówienie 👋</h1>
            
            <div className="mb-4 flex items-center p-3 bg-green-50 rounded-md text-green-800">
              <ShieldCheck className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">Raport dostępny za jedyne <strong>{REPORT_PRICE} {CURRENCY}</strong></p>
            </div>
            
            <p className="text-gray-600 mb-4">
              Czas zaprosić do gry Twoją drugą połówkę. Na końcu poznacie Wasze ukryte pragnienia.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="userName"
                placeholder="Twoje imię"
                value={formData.userName}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
              />
              
              <Input
                name="userEmail"
                type="email"
                placeholder="Twój e-mail (tam wyślemy raport)"
                value={formData.userEmail}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
              />
              
              <Input
                name="partnerName"
                placeholder="Imię Twojej partnerki/partnera"
                value={formData.partnerName}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
              />
              
              <Input
                name="partnerEmail"
                type="email"
                placeholder="E-mail partnerki/partnera (tam wyślemy zaproszenie)"
                value={formData.partnerEmail}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
              />

              <div className="p-4 bg-gray-50 rounded-md flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.giftWrap}
                  onChange={() => handleCheckboxChange('giftWrap', !formData.giftWrap)}
                  className="w-4 h-4 accent-purple-800"
                />
                <Gift className="text-yellow-600 w-5 h-5" />
                <span>Zapakuj na prezent (bezpłatnie)</span>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </div>

              <div className="text-xs text-gray-600 mt-4 text-center">
                Grając, akceptujesz przyjazny <a href="#" className="underline">Regulamin</a> i <a href="#" className="underline">Politykę Prywatności</a>, która gwarantuje bezpieczeństwo Waszych danych. Usuniemy je po 7 dniach.
              </div>

              <div className="flex flex-col gap-3 items-center mt-6">
                <Button
                  type="submit"
                  className="w-full max-w-xs px-10 py-3 rounded-full font-medium"
                  style={{ backgroundColor: '#800000' }}
                >
                  Zapłać {REPORT_PRICE} {CURRENCY}
                </Button>
                
                <Link to="/survey" className="w-full flex justify-center">
                  <Button
                    type="button" 
                    variant="outline"
                    className="max-w-xs py-2 px-6 rounded-full font-medium"
                  >
                    Wróć do ankiety
                  </Button>
                </Link>
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                Płatność jest zabezpieczona szyfrowaniem SSL
              </div>
            </form>
          </div>

          {/* Prawa kolumna - podgląd wiadomości */}
          <div className="lg:w-1/2 bg-gray-50 p-8 rounded-r-2xl">
            <div className="text-center text-sm text-gray-500 mb-6 font-medium">
              TA WIADOMOŚĆ ZOSTANIE WYSŁANA
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="bg-gray-700 text-white p-4 font-medium">
                Nowa wiadomość
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex">
                  <div className="w-1/5 font-medium text-gray-600">Od</div>
                  <div className="w-4/5">Secret Sparks</div>
                </div>
                
                <div className="flex">
                  <div className="w-1/5 font-medium text-gray-600">Do</div>
                  <div className="w-4/5">
                    {formData.partnerEmail || 'Imię <email@gmail.com>'}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-1/5 font-medium text-gray-600">Temat</div>
                  <div className="w-4/5">
                    <span className="text-red-500">🔔</span> {formData.userName || 'Ktoś'} zaprasza Cię do gry
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-1/5 font-medium text-gray-600">Cześć</div>
                  <div className="w-4/5">❤️</div>
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
    </div>
  );
};

export default PaymentPage;