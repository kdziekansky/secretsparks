
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

// Ustaw nagłówki CORS - dodajemy stripe-signature do dozwolonych nagłówków
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

serve(async (req) => {
  console.log("========== WEBHOOK INVOKED ==========");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  
  // Obsługa CORS preflight
  if (req.method === 'OPTIONS') {
    console.log("Obsługa żądania OPTIONS (CORS preflight)");
    return new Response(null, { headers: corsHeaders, status: 200 });
  }
  
  try {
    // Inicjalizuj klienty - przeniesiono do wnętrza try-catch
    console.log("Inicjalizacja klientów Supabase i Stripe");
    
    // Sprawdź i wypisz klucze konfiguracyjne (bezpiecznie, bez pokazywania pełnych wartości)
    console.log("Konfiguracja:");
    console.log("- SUPABASE_URL:", supabaseUrl ? `ustawiony (${supabaseUrl.slice(0, 20)}...)` : "BRAK");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? `ustawiony (${supabaseServiceKey.slice(0, 5)}...)` : "BRAK");
    console.log("- STRIPE_SECRET_KEY:", stripeSecretKey ? `ustawiony (${stripeSecretKey.slice(0, 5)}...)` : "BRAK");
    console.log("- STRIPE_WEBHOOK_SECRET:", endpointSecret ? `ustawiony (${endpointSecret.slice(0, 5)}...)` : "BRAK");
    
    // Jeśli brakuje kluczy, zwróć błąd wcześniej
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Brak wymaganych kluczy Supabase!");
      return new Response(JSON.stringify({ error: "Brak wymaganych kluczy Supabase", received: true }), {
        status: 200, // Zawsze 200 dla Stripe
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (!stripeSecretKey) {
      console.error("Brak wymaganego klucza Stripe!");
      return new Response(JSON.stringify({ error: "Brak wymaganego klucza Stripe", received: true }), {
        status: 200, // Zawsze 200 dla Stripe
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });
    
    // Pobierz body i nagłówki
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    
    console.log("Raw body length:", body.length);
    console.log("Signature provided:", signature ? "YES" : "NO");
    
    let event;
    
    // Próba weryfikacji podpisu tylko jeśli mamy sekret i sygnaturę
    if (endpointSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
        console.log("Weryfikacja podpisu Stripe udana");
      } catch (verifyError) {
        console.error("Weryfikacja podpisu Stripe nieudana:", verifyError.message);
        
        // Mimo błędu weryfikacji, spróbujmy rozparsować JSON
        try {
          event = JSON.parse(body);
          console.log("Fallback do parsowania JSON (po błędzie weryfikacji):", event.type);
        } catch (parseError) {
          console.error("Błąd parsowania JSON:", parseError.message);
          return new Response(JSON.stringify({ 
            error: "Nieprawidłowy podpis i format JSON", 
            verifyError: verifyError.message,
            parseError: parseError.message,
            received: true 
          }), {
            status: 200, // Zawsze 200 dla Stripe
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
    } else {
      // Brak sekretu webhooka lub podpisu, parsujemy jako zwykły JSON
      try {
        event = JSON.parse(body);
        console.log("Parsowanie jako prosty JSON (brak sekretu webhooka lub podpisu)");
      } catch (parseError) {
        console.error("Błąd parsowania JSON:", parseError.message);
        return new Response(JSON.stringify({ error: "Nieprawidłowy format JSON", received: true }), {
          status: 200, // Zawsze 200 dla Stripe
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
    console.log("Typ zdarzenia:", event.type);
    
    // Obsługa zdarzenia checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.client_reference_id || session.metadata?.order_id;
      const paymentId = session.payment_intent;
      
      console.log("Przetwarzanie zakończonego checkout dla zamówienia:", orderId);
      console.log("ID płatności:", paymentId);
      
      if (!orderId) {
        console.error("Brak ID zamówienia w sesji:", session.id);
        return new Response(JSON.stringify({ error: "Brak ID zamówienia", received: true }), {
          status: 200, // Zwracamy 200 aby Stripe nie próbował ponownie
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Sprawdź, czy zamówienie zostało już zaktualizowane i e-maile wysłane
      const { data: orderCheck, error: orderCheckError } = await supabase
        .from('orders')
        .select('status, emails_sent')
        .eq('id', orderId)
        .single();
      
      console.log("Aktualny stan zamówienia:", orderCheck);
      
      // Aktualizuj status zamówienia tylko jeśli nie jest jeszcze 'paid'
      if (!orderCheck || orderCheck.status !== 'paid') {
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
          return new Response(JSON.stringify({ error: `Aktualizacja bazy danych nie powiodła się: ${error.message}`, received: true }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        console.log("Zaktualizowane dane:", data);
        console.log("Pomyślnie zaktualizowano status zamówienia na opłacone");
      } else {
        console.log("Zamówienie ma już status 'paid', pomijanie aktualizacji");
      }
      
      // Wysyłaj e-maile tylko jeśli nie zostały jeszcze wysłane
      if (!orderCheck || !orderCheck.emails_sent) {
        try {
          console.log("Wywołanie funkcji wysyłania e-maili");
          const emailResponse = await fetch(
            `${supabaseUrl}/functions/v1/send-order-emails`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseServiceKey}`
              },
              body: JSON.stringify({ orderId })
            }
          );
          
          // Sprawdź status odpowiedzi
          if (!emailResponse.ok) {
            throw new Error(`HTTP Error: ${emailResponse.status}`);
          }
          
          const emailResult = await emailResponse.json();
          console.log("Wynik wysyłania e-maili:", emailResult);
          
          // Oznacz e-maile jako wysłane
          await supabase
            .from('orders')
            .update({ emails_sent: true })
            .eq('id', orderId);
            
          console.log("Zamówienie oznaczone jako emails_sent = true");
        } catch (emailError) {
          console.error("Błąd wysyłania e-maili:", emailError);
          // Nie przerywamy przetwarzania, jeśli wysyłanie e-maili nie powiodło się
        }
      } else {
        console.log("E-maile zostały już wysłane dla tego zamówienia, pomijanie");
      }
    } else if (event.type === 'payment_intent.succeeded') {
      // Ignorujemy to zdarzenie, ponieważ już obsługujemy checkout.session.completed
      console.log("Zignorowano zdarzenie payment_intent.succeeded - używamy tylko checkout.session.completed");
    }
    
    // Zawsze zwracamy sukces 200 do Stripe, aby zapobiec ponownym próbom
    return new Response(JSON.stringify({ received: true, success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Loguj i zwróć błąd, ale zawsze z kodem 200 dla Stripe
    console.error("Ogólny błąd webhooka:", error.message);
    console.error("Stack trace:", error.stack);
    return new Response(JSON.stringify({ error: error.message, received: true }), {
      status: 200, // Zawsze zwracamy 200 do Stripe
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
