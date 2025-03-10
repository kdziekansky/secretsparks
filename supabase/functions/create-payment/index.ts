
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.4.0?target=deno';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') || '';

if (!STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set. Please check your environment variables.');
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("Create payment function called");
  
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return new Response(
        JSON.stringify({ error: "Brakuje klucza API Stripe w konfiguracji" }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log("Processing payment request");
    
    const body = await req.text();
    console.log("Request body:", body);
    
    let data;
    try {
      const jsonData = JSON.parse(body);
      data = jsonData.data;
    } catch (error) {
      console.error("JSON parse error:", error);
      return new Response(
        JSON.stringify({ error: "Błąd parsowania JSON" }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    const { 
      price, 
      currency = 'pln', 
      user_name, 
      user_email,
      partner_name,
      partner_email,
      gift_wrap,
      order_id
    } = data;

    console.log("Creating Stripe session with params:", { price, currency, order_id });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Secret Sparks Report',
              description: `Raport dla ${user_name} i ${partner_name}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/thank-you?orderId=${order_id}`,
      cancel_url: `${req.headers.get('origin')}/payment?orderId=${order_id}`,
      client_reference_id: order_id,
      customer_email: user_email,
      metadata: {
        order_id: order_id,
        user_name: user_name,
        user_email: user_email,
        partner_name: partner_name,
        partner_email: partner_email,
        gift_wrap: gift_wrap ? 'true' : 'false',
      },
    });

    console.log("Stripe session created:", { id: session.id, url: session.url });

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
