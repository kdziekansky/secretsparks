
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

  useEffect(() => {
    console.log("ThankYouPage mounted, orderId:", orderId);
    
    const fetchOrderDetails = async () => {
      if (!orderId) {
        console.log("No orderId found in URL params");
        setLoading(false);
        return;
      }

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
        
        console.log("Order data received:", data);
        setOrderDetails(data);
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

  // If no orderId or error occurred and not loading
  if ((!orderId || error) && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="glass-panel p-8 w-full max-w-xl text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <AlertCircle className="text-red-500 h-16 w-16" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-medium mb-4">
            {error ? "An error occurred" : "Order not found"}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            {error ? error : "We couldn't find your order details. Please try again or contact us."}
          </p>
          
          <Link to="/">
            <Button>Return to home page</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="glass-panel p-8 w-full max-w-xl text-center">
          <p className="text-lg">Loading order details...</p>
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
          Thank you for your purchase!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-4">
          Your order has been successfully placed.
        </p>

        {orderDetails && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Order details</h2>
            <div className="space-y-2">
              <p><strong>Order:</strong> #{orderDetails.id.substring(0, 8)}</p>
              <p><strong>Email:</strong> {orderDetails.user_email}</p>
              <p><strong>Partner:</strong> {orderDetails.partner_name}</p>
            </div>
          </div>
        )}
        
        <p className="text-muted-foreground mb-8">
          We've sent a confirmation to your email. Your partner will receive a survey invitation soon.
        </p>
        
        <Link to="/">
          <Button>Return to home page</Button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
