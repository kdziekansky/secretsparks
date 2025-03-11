
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { STRIPE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { useSurvey } from '@/contexts/SurveyContext';
import { toast } from 'sonner';

// Define form schema
const formSchema = z.object({
  userName: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  userEmail: z.string().email('Proszę podać poprawny adres email'),
  partnerName: z.string().min(2, 'Imię partnera musi mieć co najmniej 2 znaki'),
  partnerEmail: z.string().email('Proszę podać poprawny adres email partnera'),
});

type FormData = z.infer<typeof formSchema>;

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    answers, 
    filteredQuestions, 
    currentQuestion, 
    surveyConfig,
    setOrderId
  } = useSurvey();
  
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Ensure we have a Stripe instance
  const [stripePromise] = useState(() => loadStripe(STRIPE_PUBLISHABLE_KEY));
  
  // Initialize the form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      userEmail: '',
      partnerName: '',
      partnerEmail: '',
    },
  });

  useEffect(() => {
    // Check if survey is complete
    if (!currentQuestion || filteredQuestions.length === 0 || Object.keys(answers).length < filteredQuestions.length) {
      navigate('/survey');
      toast.error('Proszę najpierw wypełnić ankietę');
    }
  }, [navigate, currentQuestion, filteredQuestions, answers]);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setPaymentError(null);
    
    try {
      // Prepare the questions answered by the user
      const userResponses = filteredQuestions.map(question => ({
        question_id: question.id,
        answer: answers[question.id] || 0,
        user_gender: surveyConfig.userGender,
        partner_gender: surveyConfig.partnerGender,
        game_level: surveyConfig.gameLevel,
      }));
      
      console.log(`Submitting payment with ${userResponses.length} responses`);
      
      // Create the payment intent
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: 4900, // 49 PLN in groszy
          currency: 'pln',
          user_email: data.userEmail,
          user_name: data.userName,
          partner_email: data.partnerEmail,
          partner_name: data.partnerName,
          user_gender: surveyConfig.userGender,
          partner_gender: surveyConfig.partnerGender,
          game_level: surveyConfig.gameLevel,
          user_responses: userResponses,
          question_ids: filteredQuestions.map(q => q.id), // Include question sequence
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message || 'Payment failed');
      }

      // Store the order ID in the survey context
      if (paymentData?.orderId) {
        setOrderId(paymentData.orderId);
      }

      // Redirect to Stripe payment page
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }
      
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: paymentData.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message || 'Error redirecting to payment page');
      }
      
    } catch (error: any) {
      console.error('Payment submission error:', error);
      setPaymentError(error.message || 'Wystąpił błąd podczas przetwarzania płatności');
      toast.error('Błąd płatności', {
        description: error.message || 'Wystąpił błąd podczas przetwarzania płatności',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-container min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="glass-panel w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Płatność za ankietę</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Your details */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Twoje dane</h2>
              
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twoje imię</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twój email</FormLabel>
                    <FormControl>
                      <Input placeholder="jan@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Partner details */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Dane partnera</h2>
              
              <FormField
                control={form.control}
                name="partnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię partnera</FormLabel>
                    <FormControl>
                      <Input placeholder="Anna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="partnerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email partnera</FormLabel>
                    <FormControl>
                      <Input placeholder="anna@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {paymentError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {paymentError}
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Przetwarzanie...' : 'Zapłać 49 PLN'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PaymentPage;
