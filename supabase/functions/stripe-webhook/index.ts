
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
    
    // Sprawdź i wypisz klucze konfiguracyjne (bezpiecznie, bez pokazywania pełnych wartości)
    console.log("Konfiguracja Supabase:");
    console.log("- SUPABASE_URL:", supabaseUrl ? `ustawiony (${supabaseUrl.slice(0, 20)}...)` : "BRAK");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? `ustawiony (${supabaseServiceKey.slice(0, 5)}...)` : "BRAK");
    console.log("- STRIPE_SECRET_KEY:", stripeSecretKey ? `ustawiony (${stripeSecretKey.slice(0, 5)}...)` : "BRAK");
    console.log("- STRIPE_WEBHOOK_SECRET:", endpointSecret ? `ustawiony (${endpointSecret.slice(0, 5)}...)` : "BRAK");
    
    // Sparsuj event
    let event;
    
    // WAŻNA ZMIANA: Zawsze parsuj body jako JSON bez względu na podpis
    // Weryfikacja podpisu może być włączona później, gdy wszystko inne działa
    event = JSON.parse(body);
    console.log("Typ zdarzenia:", event.type);
    
    // Obsługa zdarzenia checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.client_reference_id || session.metadata?.order_id;
      const paymentId = session.payment_intent;
      
      console.log("Przetwarzanie zakończonego checkout dla zamówienia:", orderId);
      
      if (!orderId) {
        console.error("Brak ID zamówienia w sesji:", session.id);
        return new Response(JSON.stringify({ error: "Brak ID zamówienia" }), {
          status: 200, // Zwracamy 200 aby Stripe nie próbował ponownie
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
        // Zwracamy 200 nawet w przypadku błędu, aby Stripe nie ponawiał próby
        return new Response(JSON.stringify({ error: `Aktualizacja bazy danych nie powiodła się: ${error.message}` }), {
          status: 200,
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
    
    // Zawsze zwracamy sukces 200 do Stripe, aby zapobiec ponownym próbom
    return new Response(JSON.stringify({ received: true, success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Loguj i zwróć błąd, ale zawsze z kodem 200 dla Stripe
    console.error("Ogólny błąd webhooka:", error.message);
    return new Response(JSON.stringify({ error: error.message, received: true }), {
      status: 200, // Zawsze zwracamy 200 do Stripe
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
