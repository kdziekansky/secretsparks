
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
    
    // Sprawdź i wypisz klucze konfiguracyjne (bezpiecznie, bez pokazywania pełnych wartości)
    console.log("Konfiguracja Supabase:");
    console.log("- SUPABASE_URL:", supabaseUrl ? `ustawiony (${supabaseUrl.slice(0, 20)}...)` : "BRAK");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? `ustawiony (${supabaseServiceKey.slice(0, 5)}...)` : "BRAK");
    console.log("- STRIPE_SECRET_KEY:", stripeSecretKey ? `ustawiony (${stripeSecretKey.slice(0, 5)}...)` : "BRAK");
    console.log("- STRIPE_WEBHOOK_SECRET:", endpointSecret ? `ustawiony (${endpointSecret.slice(0, 5)}...)` : "BRAK");
    
    // Sparsuj event
    let event;
    try {
      if (signature && endpointSecret) {
        try {
          console.log("Weryfikacja podpisu z sekretnym kluczem");
          event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
          console.log("Weryfikacja podpisu udana");
        } catch (verifyError) {
          console.error("Weryfikacja podpisu nieudana:", verifyError.message);
          event = JSON.parse(body);
          console.log("Zdarzenie sparsowane bezpośrednio z body");
        }
      } else {
        console.log("Pomijam weryfikację podpisu - parsowanie zdarzenia bezpośrednio");
        event = JSON.parse(body);
      }
    } catch (err) {
      console.error("Błąd parsowania/weryfikacji zdarzenia:", err.message);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log("Typ zdarzenia:", event.type);
    console.log("Dane zdarzenia:", JSON.stringify(event.data.object));
    
    // Obsługa zdarzenia checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.client_reference_id || session.metadata?.order_id;
      const paymentId = session.payment_intent;
      
      console.log("Przetwarzanie zakończonego checkout dla zamówienia:", orderId);
      
      if (!orderId) {
        console.error("Brak ID zamówienia w sesji:", session.id);
        return new Response(JSON.stringify({ error: "Brak ID zamówienia" }), {
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Aktualizuj status zamówienia
      console.log("Aktualizacja statusu zamówienia na 'paid'");
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          payment_id: paymentId,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select();
      
      console.log("Wynik aktualizacji:", error ? `BŁĄD: ${error.message}` : "SUKCES");
      if (error) {
        console.error("Błąd aktualizacji bazy danych:", error);
        return new Response(JSON.stringify({ error: `Aktualizacja bazy danych nie powiodła się: ${error.message}` }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      console.log("Zaktualizowane dane:", data);
      console.log("Pomyślnie zaktualizowano status zamówienia na opłacone");
    } else if (event.type === 'payment_intent.succeeded') {
      // Obsługa alternatywnego zdarzenia payment_intent.succeeded
      const intent = event.data.object;
      console.log("Płatność zakończona sukcesem:", intent.id);
      
      // Szukaj zamówienia po payment_id
      const { data: orders, error: searchError } = await supabase
        .from('orders')
        .select('*')
        .eq('payment_id', intent.id);
      
      if (searchError) {
        console.error("Błąd wyszukiwania zamówienia po ID płatności:", searchError);
      } else if (orders && orders.length > 0) {
        console.log("Znaleziono zamówienie z pasującym ID płatności:", orders[0].id);
        
        // Aktualizuj status zamówienia
        const { data, error } = await supabase
          .from('orders')
          .update({ 
            status: 'paid',
            updated_at: new Date().toISOString()
          })
          .eq('id', orders[0].id)
          .select();
        
        console.log("Wynik aktualizacji:", error ? `BŁĄD: ${error.message}` : "SUKCES");
        if (error) {
          console.error("Błąd aktualizacji bazy danych:", error);
        } else {
          console.log("Zaktualizowane dane:", data);
          console.log("Pomyślnie zaktualizowano status zamówienia na opłacone");
        }
      } else {
        console.log("Nie znaleziono zamówień z ID płatności:", intent.id);
      }
    }
    
    // Zwróć sukces
    return new Response(JSON.stringify({ received: true, success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Loguj i zwróć błąd
    console.error("Ogólny błąd webhooka:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
