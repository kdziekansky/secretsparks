import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Confetti } from '@/components/Confetti';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

const ThankYouPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast: uiToast } = useToast();
  const [isPartnerCompletion, setIsPartnerCompletion] = useState(false);
  const [saveSequenceAttempted, setSaveSequenceAttempted] = useState(false);
  
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
        
        // CRITICAL FIX: ALWAYS check if we can save user question sequence
        if (!data.user_question_sequence || data.user_question_sequence.length === 0) {
          await ensureUserQuestionSequence(orderId);
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

    // New function to ensure user question sequence is saved
    const ensureUserQuestionSequence = async (orderId: string) => {
      if (saveSequenceAttempted) return; // Prevent infinite loops
      setSaveSequenceAttempted(true);
      
      console.log("Attempting to save user question sequence for order:", orderId);
      
      try {
        // Get user responses for this order
        const { data: responses, error: responsesError } = await supabase
          .from('survey_responses')
          .select('question_id, created_at')
          .eq('order_id', orderId)
          .eq('user_type', 'user')
          .order('created_at', { ascending: true });
          
        if (responsesError) {
          console.error('Error fetching user responses:', responsesError);
          throw responsesError;
        }
        
        if (!responses || responses.length === 0) {
          console.log("No user responses found yet, nothing to save");
          return;
        }
        
        console.log(`Found ${responses.length} user responses, saving question sequence`);
        
        // Extract question IDs in order they were answered
        const questionIds = responses.map(response => response.question_id);
        
        // CRITICAL: Save sequence to orders table
        const { error: updateError } = await supabase
          .from('orders')
          .update({ 
            user_question_sequence: questionIds,
            // Also add any other critical fields as needed
          })
          .eq('id', orderId);
          
        if (updateError) {
          console.error('Error saving question sequence:', updateError);
          throw updateError;
        }
        
        console.log('Question sequence saved successfully:', questionIds);
        toast.success('Sekwencja pytań zapisana pomyślnie');
        
        // Update local state with new data
        const { data: updatedOrder } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();
          
        if (updatedOrder) {
          setOrderDetails(updatedOrder);
        }
      } catch (err) {
        console.error('Failed to save question sequence:', err);
        toast.error('Nie udało się zapisać sekwencji pytań');
      }
    };

    fetchOrderDetails();
  }, [orderId, saveSequenceAttempted]);

  // Partner thank you message (when no order ID is provided but it's a partner survey completion)
  if (isPartnerCompletion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="glass-panel p-8 w-full max-w-xl text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500 h-16 w-16" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-medium mb-4">
            Dziękujemy za wypełnienie ankiety!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Twoje odpowiedzi zostały zapisane. Dziękujemy za współpracę.
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
              {orderDetails.user_question_sequence && orderDetails.user_question_sequence.length > 0 ? (
                <p className="text-green-600">
                  Sekwencja pytań ({orderDetails.user_question_sequence.length}) została zapisana dla partnera
                </p>
              ) : (
                <p className="text-amber-600">
                  Sekwencja pytań zostanie zapisana po ukończeniu ankiety
                </p>
              )}
            </div>
          </div>
        )}
        
        <p className="text-muted-foreground mb-8">
          Wysłaliśmy potwierdzenie na Twój adres email. Twój partner otrzyma wkrótce zaproszenie do ankiety z identycznymi pytaniami.
        </p>
        
        <Link to="/">
          <Button>Powrót na stronę główną</Button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
