
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { Resend } from 'https://esm.sh/resend@2.0.0'

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
    console.log("Inicjalizacja klienta Resend z wersją 2.0.0...");
    let resend;
    try {
      resend = new Resend(resendApiKey);
      console.log("Klient Resend został pomyślnie zainicjalizowany");
    } catch (resendInitError) {
      console.error("Błąd podczas inicjalizacji klienta Resend:", resendInitError);
      throw new Error(`Nie można zainicjalizować klienta Resend: ${resendInitError.message}`);
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

    // Get the origin for generating correct survey URL
    const origin = new URL(req.url).origin;
    // For development fallback to a production URL if edge-runtime is detected
    const appBaseUrl = origin.includes('edge-runtime') 
      ? 'https://secretsparks.pl' 
      : origin;
      
    console.log(`Wykorzystuję bazowy URL dla aplikacji: ${appBaseUrl}`);

    // STEP 2: Send thank you email to user
    console.log('KROK 2: Wysyłam email z podziękowaniem do użytkownika');
    let userEmailResult;
    try {
      userEmailResult = await resend.emails.send({
        from: 'Secret Sparks <notifications@secretsparks.pl>',
        reply_to: 'contact@secretsparks.pl',
        to: order.user_email,
        subject: 'Dziękujemy za zakup raportu w Secret Sparks',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Dziękujemy za zakup!</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  color: #f8f8f8;
                  background-color: #121321;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #1A1F2C;
                  border-radius: 10px;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                }
                .header {
                  background-color: #8B0000;
                  color: white;
                  padding: 20px;
                  text-align: center;
                  border-radius: 8px 8px 0 0;
                  margin-bottom: 30px;
                }
                .content {
                  padding: 0 20px 20px;
                }
                .info-box {
                  background-color: #222532;
                  border-left: 4px solid #8B0000;
                  padding: 15px;
                  margin: 20px 0;
                  border-radius: 4px;
                }
                h1 {
                  margin: 0;
                  font-size: 24px;
                }
                h2 {
                  margin-top: 30px;
                  font-size: 20px;
                  color: #e6e6e6;
                }
                .footer {
                  margin-top: 30px;
                  text-align: center;
                  color: #b0b0b0;
                  font-size: 14px;
                }
                .order-number {
                  background-color: #222532;
                  padding: 8px 12px;
                  border-radius: 4px;
                  font-family: monospace;
                  font-weight: bold;
                  color: #e6e6e6;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Dziękujemy za zakup!</h1>
                </div>
                <div class="content">
                  <p>Cześć ${order.user_name},</p>
                  
                  <p>Dziękujemy za zamówienie raportu Secret Sparks. To pierwszy krok do odkrycia zupełnie nowego wymiaru Waszej relacji!</p>
                  
                  <div class="info-box">
                    <h2>Co się teraz stanie?</h2>
                    <p>Właśnie wysłaliśmy zaproszenie do ankiety do ${order.partner_name} na adres: ${order.partner_email}</p>
                  </div>
                  
                  <p>Gdy ${order.partner_name} wypełni swoją część ankiety, nasz system AI przeanalizuje Wasze odpowiedzi i przygotuje spersonalizowany raport, który pomoże Wam odkryć wspólne pragnienia.</p>
                  
                  <p>Numer Twojego zamówienia: <span class="order-number">${order.id.substring(0, 8)}</span></p>
                  
                  <div class="footer">
                    <p>Z gorącymi pozdrowieniami,<br>Zespół Secret Sparks</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      console.log('Email do użytkownika wysłany:', userEmailResult);
    } catch (userEmailError) {
      console.error('Błąd podczas wysyłania emaila do użytkownika:', userEmailError);
      throw new Error(`Nie udało się wysłać emaila do użytkownika: ${userEmailError.message}`);
    }

    // STEP 3: Send invitation email to partner with link to the survey
    const partnerSurveyUrl = `${appBaseUrl}/survey?token=${order.partner_survey_token}`;
    console.log('KROK 3: Wysyłam email z zaproszeniem do partnera');
    console.log(`URL ankiety dla partnera: ${partnerSurveyUrl}`);
    
    let partnerEmailResult;
    try {
      partnerEmailResult = await resend.emails.send({
        from: 'Secret Sparks <notifications@secretsparks.pl>',
        reply_to: 'contact@secretsparks.pl',
        to: order.partner_email,
        subject: `${order.user_name} zaprasza Cię do Secret Sparks`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Zaproszenie do wyjątkowej gry</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  color: #f8f8f8;
                  background-color: #121321;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #1A1F2C;
                  border-radius: 10px;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                }
                .header {
                  background-color: #8B0000;
                  color: white;
                  padding: 20px;
                  text-align: center;
                  border-radius: 8px 8px 0 0;
                  margin-bottom: 30px;
                }
                .content {
                  padding: 0 20px 20px;
                }
                .info-box {
                  background-color: #222532;
                  border-left: 4px solid #8B0000;
                  padding: 15px;
                  margin: 20px 0;
                  border-radius: 4px;
                }
                h1 {
                  margin: 0;
                  font-size: 24px;
                }
                .button {
                  display: inline-block;
                  background-color: #8B0000;
                  color: white;
                  text-decoration: none;
                  padding: 12px 25px;
                  border-radius: 5px;
                  margin: 20px 0;
                  text-align: center;
                  font-weight: bold;
                  transition: background-color 0.3s;
                }
                .button:hover {
                  background-color: #a00000;
                }
                .button-container {
                  text-align: center;
                  margin: 30px 0;
                }
                .footer {
                  margin-top: 30px;
                  text-align: center;
                  color: #b0b0b0;
                  font-size: 14px;
                }
                .highlight {
                  color: #ff8a8a;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Zaproszenie do wyjątkowej gry</h1>
                </div>
                <div class="content">
                  <p>Cześć ${order.partner_name},</p>
                  
                  <p>${order.user_name} zaprosił(a) Cię do gry Secret Sparks – wyjątkowego doświadczenia, które pomoże Wam <span class="highlight">odkryć wspólne pragnienia i fantazje</span>, o których może nawet nie wiedzieliście.</p>
                  
                  <div class="info-box">
                    <h2>Jak to działa?</h2>
                    <p>Odpowiadasz na kilka pytań o swoich preferencjach i zainteresowaniach. ${order.user_name} już wypełnił(a) swoją ankietę. Na podstawie Waszych odpowiedzi stworzymy spersonalizowany raport pokazujący tylko te aktywności i fantazje, które oboje uznaliście za atrakcyjne.</p>
                  </div>
                  
                  <p>Twoje odpowiedzi są <strong>całkowicie poufne</strong> – ${order.user_name} nigdy nie zobaczy Twoich indywidualnych wyborów, a jedynie wspólne dopasowania w raporcie końcowym.</p>
                  
                  <div class="button-container">
                    <a href="${partnerSurveyUrl}" class="button">Rozpocznij ankietę</a>
                  </div>
                  
                  <div class="footer">
                    <p>Pozdrawiamy,<br>Zespół Secret Sparks</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
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
