
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

    console.log(`Sending emails for order: ${orderId}`)

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

    // IMPORTANT: Before sending emails, fetch user's question sequence and store it
    // This ensures partner gets the same questions
    if (!order.user_question_sequence) {
      console.log('Fetching user question sequence for consistent partner survey')
      const { data: responses, error: responsesError } = await supabase
        .from('survey_responses')
        .select('question_id, created_at')
        .eq('order_id', orderId)
        .eq('user_type', 'user')
        .order('created_at', { ascending: true })

      if (responsesError) {
        console.error('Error fetching user responses:', responsesError)
      } else if (responses && responses.length > 0) {
        // Get unique question IDs in order they were answered
        const seenIds = new Set()
        const questionIds = responses
          .map(response => response.question_id)
          .filter(id => {
            if (seenIds.has(id)) return false
            seenIds.add(id)
            return true
          })

        console.log(`Found ${questionIds.length} unique questions from user responses`)
        
        // Save question sequence to order
        const { error: updateError } = await supabase
          .from('orders')
          .update({ user_question_sequence: questionIds })
          .eq('id', orderId)
        
        if (updateError) {
          console.error('Failed to save question sequence to order:', updateError)
        } else {
          console.log('Saved question sequence to order')
          // Update our local copy of order
          order.user_question_sequence = questionIds
        }
      } else {
        console.log('No user responses found, partner will receive default question set')
      }
    } else {
      console.log('Order already has question sequence saved')
    }

    // Send thank you email to user
    console.log(`Sending thank you email to user: ${order.user_email}`)
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

    // Send invitation email to partner
    const partnerSurveyUrl = `${new URL(req.url).origin}/survey?token=${order.partner_survey_token}`
    console.log(`Sending invitation email to partner: ${order.partner_email}`)
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

    // Mark emails as sent
    const { error: updateError } = await supabase
      .from('orders')
      .update({ emails_sent: true })
      .eq('id', orderId)

    if (updateError) {
      console.error('Failed to mark emails as sent:', updateError)
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully',
        userEmail: userEmailResult,
        partnerEmail: partnerEmailResult
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
