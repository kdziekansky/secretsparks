
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0';
import { Resend } from 'https://esm.sh/resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY') || '');
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    const { orderId } = await req.json();

    // Pobierz szczegóły zamówienia
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) {
      throw new Error(`Nie można pobrać zamówienia: ${error.message}`);
    }

    // Adres URL aplikacji
    const appUrl = req.headers.get('origin') || 'https://www.secretsparks.pl';
    
    // Wyślij e-mail do klienta
    await resend.emails.send({
      from: 'Secret Sparks <hello@secretsparks.pl>',
      to: [order.user_email],
      subject: 'Dziękujemy za zakup! Twój raport Secret Sparks',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #800000;">Dziękujemy za zakup!</h1>
          <p>Cześć ${order.user_name},</p>
          <p>Dziękujemy za zamówienie raportu Secret Sparks. Właśnie wysłaliśmy zaproszenie do Twojej drugiej połówki na adres: <strong>${order.partner_email}</strong>.</p>
          <p>Gdy tylko ${order.partner_name} wypełni swoją część ankiety, przygotujemy unikalny raport specjalnie dla Was.</p>
          <p>Numer Twojego zamówienia: <strong>${order.id.substring(0, 8)}</strong></p>
          <p>Pozdrawiamy serdecznie,<br>Zespół Secret Sparks</p>
        </div>
      `,
    });

    // Unikalny link do ankiety dla partnera
    const partnerSurveyUrl = `${appUrl}/survey?token=${order.partner_survey_token}`;

    // Wyślij e-mail do partnera
    await resend.emails.send({
      from: 'Secret Sparks <hello@secretsparks.pl>',
      to: [order.partner_email],
      subject: `${order.user_name} zaprasza Cię do gry Secret Sparks`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #800000;">Zaproszenie do gry!</h1>
          <p>Cześć ${order.partner_name},</p>
          <p>${order.user_name} zaprosił(a) Cię do niezwykłej gry Secret Sparks.</p>
          <p>To zabawa, która pomoże Wam odkryć swoje ukryte pragnienia i lepiej zrozumieć siebie nawzajem.</p>
          <p>Wystarczy, że klikniesz poniższy przycisk i odpowiesz na kilka pytań:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${partnerSurveyUrl}" style="background-color: #800000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Rozpocznij ankietę</a>
          </div>
          <p>Twoje odpowiedzi będą bezpieczne i poufne - ${order.user_name} nie zobaczy ich bezpośrednio.</p>
          <p>Po wypełnieniu ankiety, nasz system wykorzysta sztuczną inteligencję, aby stworzyć unikalny raport dla Was obojga.</p>
          <p>Pozdrawiamy serdecznie,<br>Zespół Secret Sparks</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
