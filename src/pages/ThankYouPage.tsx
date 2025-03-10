
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Confetti } from '@/components/Confetti';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ThankYouPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (error) throw error;
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast({
          variant: "destructive",
          title: "Błąd",
          description: "Nie udało się pobrać szczegółów zamówienia.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, toast]);

  // Jeśli nie ma orderId lub wystąpił błąd
  if (!orderId && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="glass-panel p-8 w-full max-w-xl text-center animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-medium mb-4">
            Nie znaleziono zamówienia
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Nie znaleźliśmy szczegółów Twojego zamówienia. Spróbuj ponownie lub skontaktuj się z nami.
          </p>
          <Link to="/">
            <Button>Wróć do strony głównej</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <Confetti />
      <div className="glass-panel p-8 w-full max-w-xl text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 h-16 w-16" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-medium mb-4">
          Dziękujemy za zakup!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-4">
          Twoje zamówienie zostało pomyślnie złożone.
        </p>

        {orderDetails && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Szczegóły zamówienia</h2>
            <div className="space-y-2">
              <p><strong>Zamówienie:</strong> #{orderDetails.id.substring(0, 8)}</p>
              <p><strong>Email:</strong> {orderDetails.user_email}</p>
              <p><strong>Partner:</strong> {orderDetails.partner_name}</p>
            </div>
          </div>
        )}
        
        <p className="text-muted-foreground mb-8">
          Wysłaliśmy potwierdzenie na Twój adres email. Twoja druga połówka otrzyma wkrótce zaproszenie do ankiety.
        </p>
        
        <Link to="/">
          <Button>Wróć do strony głównej</Button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
