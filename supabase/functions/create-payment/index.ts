
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import Stripe from 'https://esm.sh/stripe@11.18.0?target=deno'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') || ''

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })

    const supabase = createClient(
      supabaseUrl,
      supabaseServiceKey
    )

    // Get request body
    const {
      amount,
      currency = 'pln',
      user_email,
      user_name,
      partner_email,
      partner_name,
      user_gender,
      partner_gender,
      game_level,
      user_responses,
      question_ids, // Added question sequence parameter
    } = await req.json()

    if (!amount || !user_email || !partner_email) {
      throw new Error('Missing required fields')
    }

    // Validate that we have responses
    if (!user_responses || user_responses.length === 0) {
      throw new Error('No survey responses provided')
    }
    
    // Validate that we have question IDs
    if (!question_ids || question_ids.length === 0) {
      throw new Error('No question sequence provided')
    }

    console.log(`Creating order for user: ${user_name} (${user_email}), partner: ${partner_name} (${partner_email})`)
    console.log(`Received ${user_responses.length} user responses and ${question_ids.length} question IDs`)

    // Create a unique partner survey token
    const partnerSurveyToken = crypto.randomUUID()

    // Create an order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_email,
        user_name,
        partner_email,
        partner_name,
        user_gender,
        partner_gender,
        game_level,
        amount,
        currency,
        payment_status: 'pending',
        partner_survey_token: partnerSurveyToken,
        user_question_sequence: question_ids, // Save the question sequence here
      })
      .select('id')
      .single()

    if (orderError || !order) {
      console.error('Error creating order:', orderError)
      throw new Error('Failed to create order')
    }

    console.log(`Created order with ID: ${order.id}`)

    // Save user responses with the order ID
    const responsesWithOrderId = user_responses.map((response: any) => ({
      ...response,
      order_id: order.id,
      user_type: 'user',
    }))

    const { error: responsesError } = await supabase
      .from('survey_responses')
      .insert(responsesWithOrderId)

    if (responsesError) {
      console.error('Error saving survey responses:', responsesError)
      // Continue anyway, as we've created the order and will create a Stripe session
    } else {
      console.log(`Saved ${responsesWithOrderId.length} survey responses`)
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'Ankieta Seksualna',
              description: 'Porównanie preferencji seksualnych dla par'
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${new URL(req.url).origin}/thank-you?orderId=${order.id}`,
      cancel_url: `${new URL(req.url).origin}/payment?canceled=true`,
      metadata: {
        order_id: order.id,
      },
      customer_email: user_email,
    })

    // Update order with Stripe session ID
    await supabase
      .from('orders')
      .update({
        stripe_session_id: session.id,
      })
      .eq('id', order.id)

    console.log(`Created Stripe session: ${session.id}`)

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        sessionId: session.id,
        orderId: order.id,
        partnerSurveyToken,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
