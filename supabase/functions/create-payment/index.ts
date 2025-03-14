
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.4.0?target=deno';

// Get environment variables
const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || '';

// Debug logs for environment variables
console.log("Environment check:");
console.log("- STRIPE_SECRET_KEY configured:", STRIPE_SECRET_KEY ? "YES (starts with " + (STRIPE_SECRET_KEY.length > 5 ? STRIPE_SECRET_KEY.substring(0, 5) : "TOO_SHORT") + "...)" : "NO");
console.log("- SUPABASE_URL configured:", SUPABASE_URL ? "YES" : "NO");
console.log("- SUPABASE_ANON_KEY configured:", SUPABASE_ANON_KEY ? "YES" : "NO");

// Initialize Stripe with error handling
let stripe;
try {
  if (!STRIPE_SECRET_KEY) {
    console.error("No Stripe secret key provided in environment variables");
    throw new Error("Brak klucza Stripe w zmiennych środowiskowych");
  }
  
  stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
  console.log("Stripe initialized successfully with key starting with:", STRIPE_SECRET_KEY.substring(0, 5));
} catch (error) {
  console.error("Failed to initialize Stripe:", error.message);
}

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("Create payment function called");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    // Validate Stripe configuration
    if (!stripe) {
      console.error('Stripe client initialization failed - missing secret key');
      return new Response(
        JSON.stringify({ error: "Brak klucza API Stripe. Skontaktuj się z administratorem systemu." }),
        {
          status: 200, // Always use 200 for responses from Edge Functions
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log("Processing payment request");
    
    // Parse and validate request body
    const body = await req.text();
    console.log("Request body length:", body.length);
    
    if (!body || body.length === 0) {
      console.error("Empty request body");
      return new Response(
        JSON.stringify({ error: "Puste żądanie. Brak danych do przetworzenia." }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    let data;
    try {
      const jsonData = JSON.parse(body);
      data = jsonData.data;
      
      // Validate data object
      if (!data) {
        throw new Error("Brak obiektu 'data' w żądaniu");
      }
      
      console.log("Successfully parsed JSON data");
    } catch (error) {
      console.error("JSON parse error:", error.message);
      return new Response(
        JSON.stringify({ error: "Błąd parsowania JSON: " + error.message }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Extract parameters from request with validation
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

    // Validate required fields
    const requiredFields = {
      price: price !== undefined && typeof price === 'number' && price > 0,
      order_id: typeof order_id === 'string' && order_id.length > 0,
      user_email: typeof user_email === 'string' && user_email.length > 0 && user_email.includes('@')
    };
    
    const missingFields = Object.entries(requiredFields)
      .filter(([_, isValid]) => !isValid)
      .map(([field]) => field);
      
    if (missingFields.length > 0) {
      console.error("Missing or invalid required fields:", missingFields);
      return new Response(
        JSON.stringify({ 
          error: `Brakujące lub nieprawidłowe dane: ${missingFields.join(', ')}`, 
          fields: missingFields 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get origin for success and cancel URLs
    const origin = req.headers.get('origin') || 'https://bqbgrjpxufblrgcoxpfk.supabase.co';
    console.log("Using origin for redirect URLs:", origin);

    // Create Stripe checkout session with data validation
    try {
      console.log("Calling Stripe checkout sessions create");
      const sessionParams = {
        payment_method_types: ['card', 'blik', 'p24'],
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: 'Secret Sparks Report',
                description: `Raport dla ${user_name || 'użytkownika'} i ${partner_name || 'partnera'}`,
              },
              unit_amount: Math.round(price * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/thank-you?orderId=${order_id}`,
        cancel_url: `${origin}/payment?orderId=${order_id}`,
        client_reference_id: order_id,
        customer_email: user_email,
        metadata: {
          order_id: order_id,
          user_name: user_name || '',
          user_email: user_email,
          partner_name: partner_name || '',
          partner_email: partner_email || '',
          gift_wrap: gift_wrap ? 'true' : 'false',
        },
      };
      
      const session = await stripe.checkout.sessions.create(sessionParams);

      console.log("Stripe session created:", { 
        id: session.id, 
        url: session.url ? session.url.substring(0, 30) + "..." : "Missing" 
      });

      if (!session || !session.url) {
        console.error("Stripe session missing URL:", JSON.stringify(session));
        return new Response(
          JSON.stringify({ 
            error: "Stripe nie zwrócił URL do płatności", 
            sessionData: session ? JSON.stringify(session) : "null" 
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ url: session.url, sessionId: session.id }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (stripeError) {
      console.error('Stripe API error:', stripeError.message);
      
      // Log detailed Stripe error information
      if (stripeError.type) {
        console.error('Stripe error type:', stripeError.type);
      }
      if (stripeError.code) {
        console.error('Stripe error code:', stripeError.code);
      }
      
      return new Response(
        JSON.stringify({ 
          error: "Błąd API Stripe: " + stripeError.message,
          type: stripeError.type,
          code: stripeError.code
        }),
        {
          status: 200, // Return 200 even for Stripe errors
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
        details: error.message
      }),
      {
        status: 200, // Always use 200 for responses from Edge Functions
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
