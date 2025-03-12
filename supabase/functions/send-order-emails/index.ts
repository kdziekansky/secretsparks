import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { Resend } from 'https://esm.sh/resend@1.0.0'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const resendApiKey = Deno.env.get('RESEND_API_KEY') || ''

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Sprawdź czy klucze API są dostępne
    console.log("Sprawdzam konfigurację środowiska:");
    console.log("- SUPABASE_URL:", supabaseUrl ? "OK" : "BRAK");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "OK" : "BRAK");
    console.log("- RESEND_API_KEY:", resendApiKey ? "OK" : "BRAK");
    
    if (!resendApiKey) {
      throw new Error('Brak klucza API Resend. Skonfiguruj zmienną środowiskową RESEND_API_KEY.');
    }

    // Create Supabase client
    const supabase = createClient(
      supabaseUrl,
      supabaseServiceKey
    )

    // Initialize Resend - z dodatkowym logowaniem
    console.log("Inicjalizacja klienta Resend...");
    let resend;
    try {
      resend = new Resend(resendApiKey);
      console.log("Klient Resend został pomyślnie zainicjalizowany");
    } catch (resendInitError) {
      console.error("Błąd inicjalizacji klienta Resend:", resendInitError);
      throw new Error(`Nie można zainicjalizować klienta Resend: ${resendInitError.message}`);
    }

    // POMOCNICZE: Sprawdź działanie Resend
    try {
      console.log("Sprawdzam połączenie z Resend API...");
      // Ta część działa tylko w nowszych wersjach Resend API - można ją zakomentować, jeśli powoduje błędy
      // const domains = await resend.domains.list();
      // console.log("Połączenie z Resend API działa:", domains);
    } catch (testError) {
      console.log("Test połączenia z Resend nie powiódł się, ale kontynuujemy:", testError.message);
    }

    // Get order ID from request
    let orderId;
    try {
      const body = await req.json();
      orderId = body.orderId;
      console.log("Otrzymane dane:", body);
    } catch (parseError) {
      console.error("Błąd parsowania JSON:", parseError);
      throw new Error('Nieprawidłowy format JSON w zapytaniu');
    }
    
    if (!orderId) {
      throw new Error('Order ID jest wymagane');
    }

    console.log(`Przetwarzanie emaili dla zamówienia: ${orderId}`);

    // Fetch order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error(`Nie udało się pobrać zamówienia: ${orderError?.message || 'Zamówienie nie znalezione'}`);
    }

    console.log("Pobrane dane zamówienia:", {
      id: order.id,
      user_name: order.user_name,
      user_email: order.user_email,
      partner_name: order.partner_name,
      partner_email: order.partner_email,
      status: order.status,
      emails_sent: order.emails_sent
    });

    // Check if emails were already sent
    if (order.emails_sent) {
      console.log('Emaile były już wysłane dla tego zamówienia');
      return new Response(
        JSON.stringify({ success: true, message: 'Emaile zostały już wcześniej wysłane' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // CRITICAL CHANGE: Upewnij się, że mamy sekwencję pytań przed wysłaniem emaili
    // STEP 1: Pobierz i zapisz sekwencję pytań jeśli jeszcze nie istnieje
    if (!order.user_question_sequence || order.user_question_sequence.length === 0) {
      console.log('Brak sekwencji pytań, pobieram i zapisuję ją przed wysłaniem emaili');
      
      const { data: userResponses, error: responsesError } = await supabase
        .from('survey_responses')
        .select('question_id, created_at')
        .eq('order_id', orderId)
        .eq('user_type', 'user')
        .order('created_at', { ascending: true });

      if (responsesError) {
        console.error('Błąd podczas pobierania odpowiedzi użytkownika:', responsesError);
        throw new Error(`Nie udało się pobrać odpowiedzi użytkownika: ${responsesError.message}`);
      }

      // CRITICAL VALIDATION: Do not send partner email if user hasn't completed the survey
      if (!userResponses || userResponses.length === 0) {
        throw new Error('Zamawiający nie wypełnił jeszcze swojej ankiety. Nie można wysłać ankiety do partnera.');
      }

      // Extract question IDs in order they were answered by user
      const questionIds = userResponses.map(response => response.question_id);
      console.log(`Znaleziono ${questionIds.length} pytań z odpowiedzi użytkownika:`, questionIds);
      
      // CRITICAL: Zapisz sekwencję pytań przed wysłaniem emaili
      const { error: updateError } = await supabase
        .from('orders')
        .update({ user_question_sequence: questionIds })
        .eq('id', orderId);
        
      if (updateError) {
        console.error('Błąd podczas zapisywania sekwencji pytań:', updateError);
        throw new Error(`Nie udało się zapisać sekwencji pytań: ${updateError.message}`);
      }
      
      console.log('Sekwencja pytań zapisana pomyślnie');
    } else {
      console.log('Sekwencja pytań już istnieje:', order.user_question_sequence.length, 'pytań');
    }

    // STEP 2: Send thank you email to user
    console.log('KROK 2: Wysyłam email z podziękowaniem do użytkownika');
    let userEmailResult;
    try {
      userEmailResult = await resend.emails.send({
        from: 'Ankieta Seksualna <no-reply@seks-ankieta.pl>',
        to: order.user_email,
        subject: 'Dziękujemy za zamówienie ankiety seksualnej',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; text-align: center;">Dziękujemy za zamówienie!</h1>
            <p>Cześć ${order.user_name},</p>
            <p>Dziękujemy za wypełnienie ankiety seksualnej. Twój partner ${order.partner_name} wkrótce otrzyma zaproszenie do wypełnienia swojej części ankiety.</p>
            <p>Po wypełnieniu ankiety przez partnera, otrzymasz szczegółowy raport porównawczy na adres email.</p>
            <p>W razie pytań, prosimy o kontakt.</p>
            <p>Pozdrawiamy,<br>Zespół Ankiety Seksualnej</p>
          </div>
        `,
      });

      console.log('Email do użytkownika wysłany:', userEmailResult);
    } catch (userEmailError) {
      console.error('Błąd podczas wysyłania emaila do użytkownika:', userEmailError);
      throw new Error(`Nie udało się wysłać emaila do użytkownika: ${userEmailError.message}`);
    }

    // STEP 3: Send invitation email to partner with link to the survey
    const partnerSurveyUrl = `${new URL(req.url).origin}/survey?token=${order.partner_survey_token}`;
    console.log('KROK 3: Wysyłam email z zaproszeniem do partnera');
    console.log(`URL ankiety dla partnera: ${partnerSurveyUrl}`);
    
    let partnerEmailResult;
    try {
      partnerEmailResult = await resend.emails.send({
        from: 'Ankieta Seksualna <no-reply@seks-ankieta.pl>',
        to: order.partner_email,
        subject: `${order.user_name} zaprasza Cię do wypełnienia ankiety seksualnej`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; text-align: center;">Zaproszenie do Ankiety Seksualnej</h1>
            <p>Cześć ${order.partner_name},</p>
            <p>${order.user_name} zaprasza Cię do wypełnienia krótkiej ankiety seksualnej. Jej celem jest porównanie Waszych preferencji i pomoc w lepszym zrozumieniu siebie nawzajem.</p>
            <p>Aby wypełnić ankietę, kliknij poniższy link:</p>
            <p style="text-align: center;">
              <a href="${partnerSurveyUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px;">Wypełnij ankietę</a>
            </p>
            <p>Po wypełnieniu ankiety przez Was oboje, otrzymacie szczegółowy raport porównawczy na adres email.</p>
            <p>Pozdrawiamy,<br>Zespół Ankiety Seksualnej</p>
          </div>
        `,
      });

      console.log('Email do partnera wysłany:', partnerEmailResult);
    } catch (partnerEmailError) {
      console.error('Błąd podczas wysyłania emaila do partnera:', partnerEmailError);
      throw new Error(`Nie udało się wysłać emaila do partnera: ${partnerEmailError.message}`);
    }

    // STEP 4: Mark emails as sent
    const { error: markSentError } = await supabase
      .from('orders')
      .update({ 
        emails_sent: true
      })
      .eq('id', orderId);

    if (markSentError) {
      console.error('Błąd podczas oznaczania emaili jako wysłane:', markSentError);
      // Continue anyway, as we've already sent the emails
    } else {
      console.log('Zamówienie oznaczone jako emails_sent = true');
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emaile wysłane pomyślnie',
        userEmail: userEmailResult,
        partnerEmail: partnerEmailResult,
        questionCount: order.user_question_sequence?.length || 0,
        questions: order.user_question_sequence || []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Błąd podczas wysyłania emaili:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
