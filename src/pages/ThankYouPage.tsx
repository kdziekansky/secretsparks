import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Confetti } from '@/components/Confetti';
import { Button } from '@/components/ui/button';
import { Heart, AlertCircle, Mail, User, Users, Gift, CheckCircle, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { formatDistance } from 'date-fns';
import { pl } from 'date-fns/locale';

const ThankYouPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast: uiToast } = useToast();
  const [isPartnerCompletion, setIsPartnerCompletion] = useState(false);
  
  useEffect(() => {
    console.log("ThankYouPage mounted, orderId:", orderId);
    
    // If no orderId, check if it's a partner completion
    if (!orderId) {
      console.log("No orderId found, assuming partner completion");
      setIsPartnerCompletion(true);
      setLoading(false);
      return;
    }
    
    const fetchOrderDetails = async () => {
      try {
        console.log("Fetching order details for orderId:", orderId);
        const { data, error: fetchError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching order:', fetchError);
          setError(fetchError.message);
          throw fetchError;
        }
        
        if (!data) {
          console.error('No order found with ID:', orderId);
          setError("Nie znaleziono zamówienia o podanym identyfikatorze");
          return;
        }
        
        console.log("Order data received:", data);
        setOrderDetails(data);
        
        // If user question sequence isn't saved yet, check if we can save it
        if (!data.user_question_sequence) {
          console.log("No question sequence saved yet, checking for responses");
          const { data: responses, error: responsesError } = await supabase
            .from('survey_responses')
            .select('question_id, created_at')
            .eq('order_id', orderId)
            .eq('user_type', 'user')
            .order('created_at', { ascending: true });
            
          if (responsesError) {
            console.error('Error fetching user responses:', responsesError);
          } else if (responses && responses.length > 0) {
            console.log(`Found ${responses.length} responses, saving question sequence`);
            // Extract question IDs in order
            const questionIds = responses.map(response => response.question_id);
              
            // Save sequence to order
            const { error: updateError } = await supabase
              .from('orders')
              .update({ user_question_sequence: questionIds })
              .eq('id', orderId);
              
            if (updateError) {
              console.error('Error saving question sequence:', updateError);
            } else {
              console.log('Question sequence saved successfully');
              toast.success('Sekwencja pytań zapisana dla partnera');
              
              // Update local state to reflect the change
              setOrderDetails({
                ...data,
                user_question_sequence: questionIds
              });
            }
          }
        } else {
          console.log("Question sequence already saved:", data.user_question_sequence);
        }
      } catch (err: any) {
        console.error('Error in fetchOrderDetails:', err);
        setError(err.message || 'Unknown error occurred');
        toast.error("Error", {
          description: "Could not fetch order details: " + err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Partner thank you message (when no order ID is provided but it's a partner survey completion)
  if (isPartnerCompletion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="glass-panel p-8 w-full max-w-xl text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <Heart className="text-pink-500 h-16 w-16" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-medium mb-4">
            Dziękujemy, odkryjecie siebie na nowo
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Twoja ankieta została wysłana, już wkrótce otrzymacie swój raport i odkryjecie się na nowo. Naszą misją jest ulepszać życie seksualne.
          </p>
          
          <Link to="/">
            <Button>Powrót na stronę główną</Button>
          </Link>
        </div>
      </div>
    );
  }

  // If error occurred and not loading
  if (error && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="glass-panel p-8 w-full max-w-xl text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <AlertCircle className="text-red-500 h-16 w-16" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-medium mb-4">
            {error ? "Wystąpił błąd" : "Nie znaleziono zamówienia"}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            {error || "Nie mogliśmy znaleźć szczegółów Twojego zamówienia. Spróbuj ponownie lub skontaktuj się z nami."}
          </p>
          
          <Link to="/">
            <Button>Powrót na stronę główną</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="glass-panel p-8 w-full max-w-xl text-center">
          <p className="text-lg">Ładowanie szczegółów zamówienia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <Confetti />
      <div className="glass-panel p-8 w-full max-w-xl text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <Heart className="text-pink-500 h-16 w-16" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-medium mb-4">
          Dziękujemy za zakup!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-4">
          Twoje zamówienie zostało pomyślnie złożone.
        </p>

        {orderDetails && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4 text-center">Szczegóły zamówienia</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Numer zamówienia</p>
                  <p className="text-muted-foreground text-sm">#{orderDetails.id.substring(0, 8)}...</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Dane zamawiającego</p>
                  <p className="text-muted-foreground text-sm">{orderDetails.user_name}</p>
                  <p className="text-muted-foreground text-sm">{orderDetails.user_email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Dane partnera</p>
                  <p className="text-muted-foreground text-sm">{orderDetails.partner_name}</p>
                  <p className="text-muted-foreground text-sm">{orderDetails.partner_email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Data zamówienia</p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(orderDetails.created_at).toLocaleDateString('pl-PL')}
                    {' '}
                    ({formatDistance(new Date(orderDetails.created_at), new Date(), { 
                      addSuffix: true,
                      locale: pl
                    })})
                  </p>
                </div>
              </div>
              
              {orderDetails.gift_wrap && (
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Pakowanie na prezent</p>
                    <p className="text-muted-foreground text-sm">Tak</p>
                  </div>
                </div>
              )}
              
              {orderDetails.user_question_sequence && (
                <div className="flex items-start gap-3">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-green-600">Sekwencja pytań została zapisana dla partnera</p>
                    <p className="text-muted-foreground text-sm">
                      {orderDetails.user_question_sequence.length} pytań przygotowanych
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Wysłaliśmy potwierdzenie na Twój adres email. Twój partner otrzyma wkrótce zaproszenie do ankiety z identycznymi pytaniami.
          </p>
          
          <div className="flex justify-center">
            <Link to="/">
              <Button>Powrót na stronę główną</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
