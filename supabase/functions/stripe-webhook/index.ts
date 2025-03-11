
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
  console.log("Headers:", [...req.headers.entries()]);
  
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
    console.log("Endpoint secret present:", !!endpointSecret);
    
    // Sparsuj event
    let event;
    try {
      if (signature && endpointSecret) {
        try {
          console.log("Verifying signature with secret");
          event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
          console.log("Signature verification successful");
        } catch (verifyError) {
          console.error("Signature verification failed:", verifyError.message);
          event = JSON.parse(body);
          console.log("Parsed event directly from body");
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
    console.log("Event data:", JSON.stringify(event.data.object));
    
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
      
      // Loguj dane konfiguracyjne (bez pełnych kluczy)
      console.log("Supabase URL:", supabaseUrl ? "set" : "not set");
      console.log("Supabase Service Key:", supabaseServiceKey ? "set (starts with: " + supabaseServiceKey.substring(0, 5) + "...)" : "not set");
      
      // Aktualizuj status zamówienia
      console.log("Updating order status to 'paid'");
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          payment_id: paymentId,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select();
      
      console.log("Update result:", error ? `ERROR: ${error.message}` : "SUCCESS");
      if (error) {
        console.error("Database update error:", error);
        return new Response(JSON.stringify({ error: `Database update failed: ${error.message}` }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      console.log("Updated data:", data);
      console.log("Successfully updated order status to paid");
    } else if (event.type === 'payment_intent.succeeded') {
      // Obsługa alternatywnego zdarzenia payment_intent.succeeded
      const intent = event.data.object;
      console.log("Payment intent succeeded:", intent.id);
      
      // Szukaj zamówienia po payment_id
      const { data: orders, error: searchError } = await supabase
        .from('orders')
        .select('*')
        .eq('payment_id', intent.id);
      
      if (searchError) {
        console.error("Error searching for order by payment ID:", searchError);
      } else if (orders && orders.length > 0) {
        console.log("Found order with matching payment ID:", orders[0].id);
        
        // Aktualizuj status zamówienia
        const { data, error } = await supabase
          .from('orders')
          .update({ 
            status: 'paid',
            updated_at: new Date().toISOString()
          })
          .eq('id', orders[0].id)
          .select();
        
        console.log("Update result:", error ? `ERROR: ${error.message}` : "SUCCESS");
        if (error) {
          console.error("Database update error:", error);
        } else {
          console.log("Updated data:", data);
          console.log("Successfully updated order status to paid");
        }
      } else {
        console.log("No orders found with payment ID:", intent.id);
      }
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
