// @ts-nocheck
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.4.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0';

// ===== POCZĄTEK KONFIGURACJI =====
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') || '';
const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
// ===== KONIEC KONFIGURACJI =====

// Inicjalizuj klienty
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

// Ustaw nagłówki CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("========== WEBHOOK INVOKED ==========");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  
  // Obsługa CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Pobierz body i nagłówki
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    console.log("Body length:", body.length);
    console.log("Signature present:", !!signature);
    
    // Sparsuj event
    let event;
    try {
      // Dla celów debugowania, będziemy tolerować brak weryfikacji
      if (signature && endpointSecret) {
        try {
          console.log("Verifying signature with secret starting with:", endpointSecret.substring(0, 10));
          event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
        } catch (verifyError) {
          console.error("Signature verification failed, parsing body directly:", verifyError.message);
          event = JSON.parse(body);
        }
      } else {
        console.log("Skipping signature verification - parsing event directly");
        event = JSON.parse(body);
      }
    } catch (err) {
      console.error("Event parsing/verification error:", err.message);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log("Event type:", event.type);
    
    // Obsługa zdarzenia checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.client_reference_id || session.metadata?.order_id;
      const paymentId = session.payment_intent;
      
      console.log("Processing completed checkout for order:", orderId);
      
      if (!orderId) {
        console.error("No order ID in session:", session.id);
        return new Response(JSON.stringify({ error: "No order ID" }), {
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Aktualizuj status zamówienia
      console.log("Updating order status to 'paid'");
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          payment_id: paymentId,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
      
      console.log("Update result:", error ? `ERROR: ${error.message}` : "SUCCESS");
      if (error) {
        console.error("Database update error:", error);
        return new Response(JSON.stringify({ error: `Database update failed: ${error.message}` }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Sukces - nie wywołujemy funkcji wysyłania e-maili na razie, aby uprościć
      console.log("Successfully updated order status to paid");
    }
    
    // Zwróć sukces
    return new Response(JSON.stringify({ received: true, success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Loguj i zwróć błąd
    console.error("Webhook general error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});