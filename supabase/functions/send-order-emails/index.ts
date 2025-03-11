
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

    // STEP 1: FIRST - Check if user responses exist and create the question sequence
    console.log('STEP 1: Checking for user responses to build question sequence')
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
    
    let questionIds = []
    
    // If we have user responses, use them to create the question sequence
    if (userResponses && userResponses.length > 0) {
      // Extract question IDs in order they were answered
      questionIds = userResponses.map(response => response.question_id)
      console.log(`Found ${questionIds.length} questions from user responses:`, questionIds)
    } else {
      // No user responses found, we need to fetch questions database
      console.log('No user responses found, generating default question sequence')
      
      // Fetch some questions from survey_responses of any order to get question IDs
      // This is a workaround since we can't access the questionsDatabase directly in edge function
      const { data: sampleResponses, error: sampleError } = await supabase
        .from('survey_responses')
        .select('distinct question_id')
        .limit(15)
      
      if (sampleError || !sampleResponses || sampleResponses.length === 0) {
        console.error('Error fetching sample questions:', sampleError)
        throw new Error('No questions available to create a sequence')
      }
      
      questionIds = sampleResponses.map(q => q.question_id)
      console.log(`Generated default set of ${questionIds.length} questions:`, questionIds)
    }
    
    // STEP 2: Save question sequence to order BEFORE creating the partner survey link
    console.log('STEP 2: Saving question sequence to order')
    const { error: updateError } = await supabase
      .from('orders')
      .update({ user_question_sequence: questionIds })
      .eq('id', orderId)
    
    if (updateError) {
      console.error('Failed to save question sequence to order:', updateError)
      throw new Error(`Failed to save question sequence: ${updateError.message}`)
    }
    
    // STEP 3: Verify the sequence was saved correctly
    console.log('STEP 3: Verifying question sequence was saved')
    const { data: updatedOrder, error: refetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()
      
    if (refetchError || !updatedOrder) {
      throw new Error(`Failed to refetch updated order: ${refetchError?.message || 'Order not found'}`)
    }
    
    if (!updatedOrder.user_question_sequence || updatedOrder.user_question_sequence.length === 0) {
      console.error('Verification failed: Question sequence not found in order after update')
      throw new Error('Failed to save question sequence to order')
    }
    
    console.log(`Verification successful: Order now has ${updatedOrder.user_question_sequence.length} questions in sequence:`, updatedOrder.user_question_sequence)

    // STEP 4: Send thank you email to user
    console.log('STEP 4: Sending thank you email to user')
    const userEmailResult = await resend.emails.send({
      from: 'Ankieta Seksualna <no-reply@seks-ankieta.pl>',
      to: updatedOrder.user_email,
      subject: 'Dziękujemy za zamówienie ankiety seksualnej',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Dziękujemy za zamówienie!</h1>
          <p>Cześć ${updatedOrder.user_name},</p>
          <p>Dziękujemy za wypełnienie ankiety seksualnej. Twój partner ${updatedOrder.partner_name} wkrótce otrzyma zaproszenie do wypełnienia swojej części ankiety.</p>
          <p>Po wypełnieniu ankiety przez partnera, otrzymasz szczegółowy raport porównawczy na adres email.</p>
          <p>W razie pytań, prosimy o kontakt.</p>
          <p>Pozdrawiamy,<br>Zespół Ankiety Seksualnej</p>
        </div>
      `,
    })

    console.log('User email sent:', userEmailResult)

    // STEP 5: Send invitation email to partner with link to the survey
    const partnerSurveyUrl = `${new URL(req.url).origin}/survey?token=${updatedOrder.partner_survey_token}`
    console.log('STEP 5: Sending invitation email to partner')
    console.log(`Partner survey URL: ${partnerSurveyUrl}`)
    
    const partnerEmailResult = await resend.emails.send({
      from: 'Ankieta Seksualna <no-reply@seks-ankieta.pl>',
      to: updatedOrder.partner_email,
      subject: `${updatedOrder.user_name} zaprasza Cię do wypełnienia ankiety seksualnej`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Zaproszenie do Ankiety Seksualnej</h1>
          <p>Cześć ${updatedOrder.partner_name},</p>
          <p>${updatedOrder.user_name} zaprasza Cię do wypełnienia krótkiej ankiety seksualnej. Jej celem jest porównanie Waszych preferencji i pomoc w lepszym zrozumieniu siebie nawzajem.</p>
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

    // STEP 6: Mark emails as sent
    const { error: markSentError } = await supabase
      .from('orders')
      .update({ emails_sent: true })
      .eq('id', orderId)

    if (markSentError) {
      console.error('Failed to mark emails as sent:', markSentError)
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully',
        userEmail: userEmailResult,
        partnerEmail: partnerEmailResult,
        questionCount: updatedOrder.user_question_sequence.length,
        questions: updatedOrder.user_question_sequence
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
