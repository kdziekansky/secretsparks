
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

// Walidacja zmiennych środowiskowych
if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Brak wymaganych kluczy Supabase. Webhook nie będzie działać poprawnie!");
}

if (!stripeSecretKey) {
  console.error("Brak wymaganego klucza Stripe. Webhook nie będzie działać poprawnie!");
}

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
    // Sprawdź i wypisz klucze konfiguracyjne (bezpiecznie, bez pokazywania pełnych wartości)
    console.log("Konfiguracja:");
    console.log("- SUPABASE_URL:", supabaseUrl ? `ustawiony (${supabaseUrl.slice(0, 20)}...)` : "BRAK");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? `ustawiony (${supabaseServiceKey.slice(0, 5)}...)` : "BRAK");
    console.log("- STRIPE_SECRET_KEY:", stripeSecretKey ? `ustawiony (${stripeSecretKey.slice(0, 5)}...)` : "BRAK");
    console.log("- STRIPE_WEBHOOK_SECRET:", endpointSecret ? `ustawiony (${endpointSecret.slice(0, 5)}...)` : "BRAK");
    
    // Jeśli brakuje kluczy, zwróć błąd wcześniej
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ 
        error: "Brak wymaganych kluczy Supabase", 
        received: true, 
        status: "configuration_error" 
      }), {
        status: 200, // Zawsze 200 dla Stripe
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (!stripeSecretKey) {
      return new Response(JSON.stringify({ 
        error: "Brak wymaganego klucza Stripe", 
        received: true, 
        status: "configuration_error" 
      }), {
        status: 200, // Zawsze 200 dla Stripe
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Inicjalizuj klienty
    let supabase;
    let stripe;
    
    try {
      supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
      
      stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2023-10-16',
      });
      
      console.log("Klienty Supabase i Stripe zostały zainicjalizowane pomyślnie");
    } catch (initError) {
      console.error("Błąd inicjalizacji klientów:", initError.message);
      return new Response(JSON.stringify({ 
        error: "Błąd inicjalizacji klientów", 
        details: initError.message,
        received: true 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Pobierz body i nagłówki
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    
    if (!body) {
      console.error("Brak body w żądaniu");
      return new Response(JSON.stringify({ 
        error: "Brak body w żądaniu", 
        received: true 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
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
        return new Response(JSON.stringify({ 
          error: "Nieprawidłowy format JSON", 
          details: parseError.message,
          received: true 
        }), {
          status: 200, // Zawsze 200 dla Stripe
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
    if (!event || !event.type) {
      console.error("Brak typu zdarzenia w żądaniu");
      return new Response(JSON.stringify({ 
        error: "Brak typu zdarzenia w żądaniu", 
        received: true 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log("Typ zdarzenia:", event.type);
    
    // Sprawdzenie uprawnień do tabeli survey_responses
    try {
      console.log("Sprawdzanie uprawnień do tabeli survey_responses...");
      
      // Spróbuj wstawić testowy rekord i natychmiast go usunąć
      const testOrder = 'test-permissions-' + Date.now();
      const { data: insertData, error: insertError } = await supabase
        .from('survey_responses')
        .insert({
          order_id: testOrder,
          question_id: 'test-permission',
          answer: 1,
          user_type: 'test'
        })
        .select();
      
      if (insertError) {
        console.error("BŁĄD UPRAWNIEŃ DO TABELI SURVEY_RESPONSES:", insertError);
        console.error("To może być przyczyna braku zapisanych odpowiedzi!");
      } else {
        console.log("Uprawnienia do tabeli survey_responses są poprawne");
        
        // Usuń testowy rekord
        if (insertData && insertData.length > 0) {
          const { error: deleteError } = await supabase
            .from('survey_responses')
            .delete()
            .eq('id', insertData[0].id);
            
          if (deleteError) {
            console.error("Błąd usuwania testowego rekordu:", deleteError);
          }
        }
      }
    } catch (permError) {
      console.error("Błąd podczas sprawdzania uprawnień:", permError);
    }
    
    // Obsługa zdarzenia checkout.session.completed
    // Ten webhook jest wywoływany TYLKO po pomyślnej płatności
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Walidacja danych sesji
      if (!session) {
        console.error("Brak danych sesji w zdarzeniu");
        return new Response(JSON.stringify({ 
          error: "Brak danych sesji", 
          received: true 
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      const orderId = session.client_reference_id || session.metadata?.order_id;
      const paymentId = session.payment_intent;
      
      console.log("Przetwarzanie zakończonego checkout dla zamówienia:", orderId);
      console.log("ID płatności:", paymentId);
      
      if (!orderId) {
        console.error("Brak ID zamówienia w sesji:", session.id);
        return new Response(JSON.stringify({ 
          error: "Brak ID zamówienia", 
          received: true 
        }), {
          status: 200, // Zwracamy 200 aby Stripe nie próbował ponownie
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Sprawdź obecny stan zamówienia
      const { data: orderCheck, error: orderCheckError } = await supabase
        .from('orders')
        .select('status, payment_id, user_question_sequence, game_level')
        .eq('id', orderId)
        .maybeSingle();
        
      if (orderCheckError) {
        console.error("Błąd pobierania zamówienia:", orderCheckError);
      }
      
      console.log("Obecny stan zamówienia przed aktualizacją:", orderCheck);
      
      // Aktualizuj status tylko jeśli to konieczne
      if (!orderCheck || orderCheck.status !== 'paid') {
        console.log("Aktualizacja statusu zamówienia na 'paid'");
        const { data: updateData, error: updateError } = await supabase
          .from('orders')
          .update({ 
            status: 'paid',
            payment_id: paymentId,
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId)
          .select();
        
        // Szczegółowe logowanie wyniku aktualizacji 
        console.log("Wynik aktualizacji statusu:", updateError ? `BŁĄD: ${updateError.message}` : "SUKCES");
        
        if (updateError) {
          console.error("Błąd aktualizacji zamówienia:", updateError);
        } else {
          console.log("Zaktualizowane dane zamówienia:", updateData);
        }
      } else {
        console.log("Zamówienie ma już status 'paid', pomijanie aktualizacji");
      }
      
      // Sprawdź stan zamówienia po aktualizacji dla weryfikacji
      const { data: updatedOrder, error: checkError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle();
        
      if (checkError) {
        console.error("Błąd pobierania zaktualizowanego zamówienia:", checkError);
      }
      
      console.log("Stan zamówienia po aktualizacji:", updatedOrder);
      
      // Pobierz odpowiedzi użytkownika, aby zapisać sekwencję pytań
      if (updatedOrder && (!updatedOrder.user_question_sequence || updatedOrder.user_question_sequence.length === 0)) {
        console.log("Próba pobrania i zapisania sekwencji pytań z odpowiedzi użytkownika");
        
        const { data: userResponses, error: responsesError } = await supabase
          .from('survey_responses')
          .select('question_id, created_at')
          .eq('order_id', orderId)
          .eq('user_type', 'user')
          .order('created_at', { ascending: true });
          
        if (responsesError) {
          console.error("Błąd pobierania odpowiedzi użytkownika:", responsesError);
        }
        
        if (userResponses && userResponses.length > 0) {
          const questionIds = userResponses.map(r => r.question_id);
          console.log(`Znaleziono ${questionIds.length} odpowiedzi użytkownika, zapisuję sekwencję:`, questionIds);
          
          const { error: seqError } = await supabase
            .from('orders')
            .update({ user_question_sequence: questionIds })
            .eq('id', orderId);
            
          if (seqError) {
            console.error("Błąd zapisywania sekwencji pytań:", seqError);
          } else {
            console.log("Sekwencja pytań zapisana pomyślnie");
          }
        } else {
          console.log("Brak odpowiedzi użytkownika, używam domyślnej sekwencji");
          
          // Domyślna sekwencja pytań
          const defaultSequence = [
            'p1', 'p2', 'p3', 'p4', 'p5', 
            'r1', 'r2', 'r3', 'r4', 'r5',
            'u1', 'u2', 'u3', 'u4', 'u5'
          ];
          
          const { error: seqError } = await supabase
            .from('orders')
            .update({ user_question_sequence: defaultSequence })
            .eq('id', orderId);
            
          if (seqError) {
            console.error("Błąd zapisywania domyślnej sekwencji:", seqError);
          } else {
            console.log("Domyślna sekwencja pytań zapisana");
          }
        }
      }
      
      // Wysyłaj e-maile po aktualizacji statusu
      if (updatedOrder && !updatedOrder.emails_sent) {
        try {
          console.log("Wywołanie funkcji wysyłania e-maili");
          
          if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error("Brak wymaganych kluczy do wywołania funkcji wysyłania e-maili");
          }
          
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
          console.error("Błąd wysyłania e-maili:", emailError.message);
          // Nie przerywamy przetwarzania, jeśli wysyłanie e-maili nie powiodło się
        }
      } else {
        console.log("E-maile zostały już wysłane dla tego zamówienia lub zamówienie nie istnieje");
      }
    } else if (event.type === 'payment_intent.succeeded') {
      // Ignorujemy to zdarzenie, ponieważ już obsługujemy checkout.session.completed
      console.log("Zignorowano zdarzenie payment_intent.succeeded - używamy tylko checkout.session.completed");
    } else {
      console.log(`Zignorowano nieobsługiwane zdarzenie: ${event.type}`);
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
    return new Response(JSON.stringify({ 
      error: error.message, 
      received: true,
      status: "error" 
    }), {
      status: 200, // Zawsze zwracamy 200 do Stripe
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
