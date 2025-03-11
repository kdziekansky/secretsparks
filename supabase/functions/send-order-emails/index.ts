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
    
    // Unikalny link do ankiety dla partnera
    const partnerSurveyUrl = `${appUrl}/survey?token=${order.partner_survey_token}`;

    // Wyślij e-mail do klienta
    await resend.emails.send({
      from: 'Secret Sparks <hello@secretsparks.pl>',
      to: [order.user_email],
      subject: 'Dziękujemy za zakup! Twój raport Secret Sparks',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <div style="background-color: #800000; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Dziękujemy za zakup!</h1>
          </div>
          
          <div style="padding: 32px 24px;">
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Cześć <strong>${order.user_name}</strong>,</p>
            
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Dziękujemy za zamówienie raportu Secret Sparks. To pierwszy krok do odkrycia zupełnie nowego wymiaru Waszej relacji!</p>
            
            <div style="background-color: #f9f9f9; border-left: 4px solid #800000; padding: 16px; margin: 24px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 15px; color: #555555;">
                <strong>Co się teraz stanie?</strong><br>
                Właśnie wysłaliśmy zaproszenie do ankiety do <strong>${order.partner_name}</strong> na adres: <strong>${order.partner_email}</strong>.
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Gdy <strong>${order.partner_name}</strong> wypełni swoją część ankiety, nasz system AI przeanalizuje Wasze odpowiedzi i przygotuje spersonalizowany raport, który pomoże Wam odkryć wspólne pragnienia.</p>
            
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Numer Twojego zamówienia: <strong style="font-family: monospace; background: #f0f0f0; padding: 2px 6px; border-radius: 4px;">${order.id.substring(0, 8)}</strong></p>
            
            <div style="border-top: 1px solid #eeeeee; margin-top: 32px; padding-top: 24px;">
              <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                Z gorącymi pozdrowieniami,<br>
                <strong>Zespół Secret Sparks</strong>
              </p>
            </div>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #777777;">
            <p style="margin: 0;">© 2025 Secret Sparks. Wszystkie prawa zastrzeżone.</p>
            <p style="margin: 8px 0 0;">Masz pytania? Napisz do nas: <a href="mailto:kontakt@secretsparks.pl" style="color: #800000;">kontakt@secretsparks.pl</a></p>
          </div>
        </div>
      `,
    });

    // Wyślij e-mail do partnera
    await resend.emails.send({
      from: 'Secret Sparks <hello@secretsparks.pl>',
      to: [order.partner_email],
      subject: `${order.user_name} zaprasza Cię do gry Secret Sparks`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <div style="background-color: #800000; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Zaproszenie do wyjątkowej gry</h1>
          </div>
          
          <div style="padding: 32px 24px;">
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Cześć <strong>${order.partner_name}</strong>,</p>
            
            <p style="font-size: 16px; line-height: 1.5; color: #333333;"><strong>${order.user_name}</strong> zaprosił(a) Cię do gry Secret Sparks – wyjątkowego doświadczenia, które pomoże Wam odkryć wspólne pragnienia i fantazje, o których może nawet nie wiedzieliście.</p>
            
            <div style="background-color: #f9f9f9; border-left: 4px solid #800000; padding: 16px; margin: 24px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 15px; color: #555555;">
                <strong>Jak to działa?</strong><br>
                Odpowiadasz na kilka pytań o swoich preferencjach i zainteresowaniach. <strong>${order.user_name}</strong> już wypełnił(a) swoją ankietę. Na podstawie Waszych odpowiedzi stworzymy spersonalizowany raport pokazujący tylko te aktywności, które oboje uznaliście za atrakcyjne.
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Twoje odpowiedzi są <strong>całkowicie poufne</strong> – <strong>${order.user_name}</strong> nigdy nie zobaczy Twoich indywidualnych wyborów, a jedynie wspólne dopasowania w raporcie końcowym.</p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${partnerSurveyUrl}" style="display: inline-block; background-color: #800000; color: white; padding: 16px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Rozpocznij ankietę</a>
            </div>
            
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">To zajmie tylko kilka minut, a może całkowicie odmienić Wasze wspólne doświadczenia.</p>
            
            <div style="border-top: 1px solid #eeeeee; margin-top: 32px; padding-top: 24px;">
              <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                Z gorącymi pozdrowieniami,<br>
                <strong>Zespół Secret Sparks</strong>
              </p>
            </div>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #777777;">
            <p style="margin: 0;">© 2025 Secret Sparks. Wszystkie prawa zastrzeżone.</p>
            <p style="margin: 8px 0 0;">Masz pytania? Napisz do nas: <a href="mailto:kontakt@secretsparks.pl" style="color: #800000;">kontakt@secretsparks.pl</a></p>
          </div>
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