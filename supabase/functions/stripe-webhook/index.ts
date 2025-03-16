import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { requireAuth } from './_require-auth.js';
import { Stripe } from "https://esm.sh/stripe@12.0.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST requests for the webhook
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Allow": "POST, OPTIONS" } }
      );
    }

    // Ensure webhook is called from Stripe
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Missing Stripe signature" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!stripeSecretKey || !webhookSecret) {
      return new Response(
        JSON.stringify({ error: "Stripe is not configured properly" }),
        { status: 500, headers: corsHeaders }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const body = await req.text();

    try {
      // Verify the event came from Stripe
      const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

      // Handle the event
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          console.log("Payment completed for session:", session.id);
          // Fulfill the purchase...
          break;
        case 'invoice.payment_succeeded':
          const invoice = event.data.object;
          console.log("Invoice payment succeeded:", invoice.id);
          // Handle successful invoice payment...
          break;
        // Add more event types as needed
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      return new Response(
        JSON.stringify({ received: true }),
        { status: 200, headers: corsHeaders }
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 400, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
