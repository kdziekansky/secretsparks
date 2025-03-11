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
    // Create Supabase client
    const supabase = createClient(
      supabaseUrl,
      supabaseServiceKey
    )

    const resend = new Resend(resendApiKey)

    // Get order ID from request
    const { orderId } = await req.json()
    
    if (!orderId) {
      throw new Error('Order ID is required')
    }

    console.log(`Processing order emails for order: ${orderId}`)

    // Fetch order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error(`Failed to fetch order: ${orderError?.message || 'Order not found'}`)
    }

    // Check if emails were already sent
    if (order.emails_sent) {
      console.log('Emails were already sent for this order')
      return new Response(
        JSON.stringify({ success: true, message: 'Emails were already sent' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // CRITICAL CHANGE: Upewnij się, że mamy sekwencję pytań przed wysłaniem emaili
    // STEP 1: Pobierz i zapisz sekwencję pytań jeśli jeszcze nie istnieje
    if (!order.user_question_sequence || order.user_question_sequence.length === 0) {
      console.log('No question sequence found, fetching and saving it before sending emails')
      
      const { data: userResponses, error: responsesError } = await supabase
        .from('survey_responses')
        .select('question_id, created_at')
        .eq('order_id', orderId)
        .eq('user_type', 'user')
        .order('created_at', { ascending: true })

      if (responsesError) {
        console.error('Error fetching user responses:', responsesError)
        throw new Error(`Failed to fetch user responses: ${responsesError.message}`)
      }

      // CRITICAL VALIDATION: Do not send partner email if user hasn't completed the survey
      if (!userResponses || userResponses.length === 0) {
        throw new Error('Zamawiający nie wypełnił jeszcze swojej ankiety. Nie można wysłać ankiety do partnera.')
      }

      // Extract question IDs in order they were answered by user
      const questionIds = userResponses.map(response => response.question_id)
      console.log(`Found ${questionIds.length} questions from user responses:`, questionIds)
      
      // CRITICAL: Zapisz sekwencję pytań przed wysłaniem emaili
      const { error: updateError } = await supabase
        .from('orders')
        .update({ user_question_sequence: questionIds })
        .eq('id', orderId)
        
      if (updateError) {
        console.error('Failed to save question sequence:', updateError)
        throw new Error(`Failed to save question sequence: ${updateError.message}`)
      }
      
      console.log('Question sequence saved successfully')
    } else {
      console.log('Question sequence already exists:', order.user_question_sequence.length, 'questions')
    }

    // STEP 2: Send thank you email to user
    console.log('STEP 2: Sending thank you email to user')
    const userEmailResult = await resend.emails.send({
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
    })

    console.log('User email sent:', userEmailResult)

    // STEP 3: Send invitation email to partner with link to the survey
    const partnerSurveyUrl = `${new URL(req.url).origin}/survey?token=${order.partner_survey_token}`
    console.log('STEP 3: Sending invitation email to partner')
    console.log(`Partner survey URL: ${partnerSurveyUrl}`)
    
    const partnerEmailResult = await resend.emails.send({
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
    })

    console.log('Partner email sent:', partnerEmailResult)

    // STEP 4: Mark emails as sent
    const { error: markSentError } = await supabase
      .from('orders')
      .update({ 
        emails_sent: true
      })
      .eq('id', orderId)

    if (markSentError) {
      console.error('Failed to mark emails as sent:', markSentError)
      // Continue anyway, as we've already sent the emails
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully',
        userEmail: userEmailResult,
        partnerEmail: partnerEmailResult,
        questionCount: order.user_question_sequence?.length || 0,
        questions: order.user_question_sequence || []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error sending emails:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})