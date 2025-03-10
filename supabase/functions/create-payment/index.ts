
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.4.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { data } = await req.json();
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

    // Utwórz sesję płatności Stripe
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
            unit_amount: Math.round(price * 100), // Stripe używa wartości w groszach
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

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
