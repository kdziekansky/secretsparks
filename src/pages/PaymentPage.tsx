import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Info, Gift, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const REPORT_PRICE = 29;
const CURRENCY = 'zł';

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { toast: toastHook } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    partnerName: '',
    partnerEmail: '',
    giftWrap: false
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        setIsLoading(true);
        console.log("Fetching order details for ID:", orderId);
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (error) {
          console.error("Order fetch error:", error);
          throw error;
        }

        console.log("Order data retrieved:", data);
        setFormData({
          userName: data.user_name,
          userEmail: data.user_email,
          partnerName: data.partner_name,
          partnerEmail: data.partner_email,
          giftWrap: data.gift_wrap
        });
      } catch (error) {
        console.error('Error fetching order:', error);
        toastHook({
          variant: "destructive", 
          title: "Error",
          description: "Failed to retrieve order data.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, toastHook]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const createOrder = async () => {
    try {
      if (orderId) {
        console.log("Using existing orderId:", orderId);
        return orderId;
      }

      console.log("Creating new order in database...");
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            user_name: formData.userName,
            user_email: formData.userEmail,
            partner_name: formData.partnerName,
            partner_email: formData.partnerEmail,
            gift_wrap: formData.giftWrap,
            price: REPORT_PRICE
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating order:", error);
        throw error;
      }
      
      console.log("Order created successfully:", data.id);
      return data.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      const newOrderId = await createOrder();
      
      console.log("Wywołuję funkcję create-payment z ID zamówienia:", newOrderId);
      
      // Przygotuj poprawny obiekt payload dla funkcji
      const payloadData = {
        price: REPORT_PRICE,
        currency: 'pln',
        user_name: formData.userName,
        user_email: formData.userEmail,
        partner_name: formData.partnerName,
        partner_email: formData.partnerEmail,
        gift_wrap: formData.giftWrap,
        order_id: newOrderId
      };
      
      console.log("Przygotowany payload:", JSON.stringify(payloadData));
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: JSON.stringify({ data: payloadData }),
      });
      
      console.log("Odpowiedź funkcji create-payment:", JSON.stringify(data), error);
      
      if (error) {
        console.error("Błąd funkcji:", error);
        throw new Error(error.message || "Problem z utworzeniem płatności");
      }
      
      if (!data) {
        console.error("Brak danych w odpowiedzi funkcji");
        throw new Error("Serwer nie zwrócił danych płatności");
      }
      
      if (!data.url) {
        console.error("Brak URL w odpowiedzi:", data);
        
        // Wyświetl bardziej szczegółowe informacje o błędzie
        if (data.error) {
          throw new Error(`Błąd płatności: ${data.error}`);
        } else {
          throw new Error("Brak URL do strony płatności");
        }
      }
      
      console.log("Przekierowuję do strony płatności:", data.url);
      
      // Przekieruj do strony płatności Stripe
      window.location.href = data.url;
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Błąd płatności", {
        description: error.message || "Nie udało się przetworzyć płatności. Spróbuj ponownie.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="glass-panel w-full max-w-5xl animate-fade-in">
        <div className="flex flex-col lg:flex-row">
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
                disabled={isLoading}
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
              />
              
              <Input
                name="userEmail"
                type="email"
                placeholder="Twój e-mail (tam wyślemy raport)"
                value={formData.userEmail}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
              />
              
              <Input
                name="partnerName"
                placeholder="Imię Twojej partnerki/partnera"
                value={formData.partnerName}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
              />
              
              <Input
                name="partnerEmail"
                type="email"
                placeholder="E-mail partnerki/partnera (tam wyślemy zaproszenie)"
                value={formData.partnerEmail}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
              />

              <div className="p-4 bg-gray-50 rounded-md flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.giftWrap}
                  onChange={() => handleCheckboxChange('giftWrap', !formData.giftWrap)}
                  disabled={isLoading}
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Przetwarzanie...
                    </>
                  ) : (
                    <>Zapłać {REPORT_PRICE} {CURRENCY}</>
                  )}
                </Button>
                
                <Link to="/survey" className="w-full flex justify-center">
                  <Button
                    type="button" 
                    variant="outline"
                    className="max-w-xs py-2 px-6 rounded-full font-medium"
                    disabled={isLoading}
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

          <div className="lg:w-1/2 bg-gray-50 p-8 rounded-r-2xl">
            {/* Reszta kodu pozostaje bez zmian */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
