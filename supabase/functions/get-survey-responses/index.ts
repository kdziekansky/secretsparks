
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing Authorization header')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    const { orderId } = await req.json()
    if (!orderId) {
      throw new Error('Missing orderId parameter')
    }

    console.log('Fetching responses for order:', orderId)
    
    // Try different query approaches to ensure we get the data
    let responses = null;
    let queryError = null;
    
    // Approach 1: Standard query
    try {
      const { data, error } = await supabaseClient
        .from('survey_responses')
        .select('*')
        .eq('order_id', orderId)
      
      if (error) {
        console.error('Error in approach 1:', error.message)
        queryError = error
      } else if (data && data.length > 0) {
        console.log(`Approach 1 successful, found ${data.length} responses`)
        responses = data
      } else {
        console.log('Approach 1: No data found')
      }
    } catch (err) {
      console.error('Exception in approach 1:', err.message)
    }
    
    // Approach 2: Direct RPC call if approach 1 failed
    if (!responses) {
      try {
        console.log('Trying approach 2: RPC call')
        const { data, error } = await supabaseClient.rpc(
          'get_survey_responses_by_order_id',
          { order_id_param: orderId }
        )
        
        if (error) {
          console.error('Error in approach 2:', error.message)
        } else if (data && data.length > 0) {
          console.log(`Approach 2 successful, found ${data.length} responses`)
          responses = data
        } else {
          console.log('Approach 2: No data found or RPC function may not exist')
        }
      } catch (err) {
        console.error('Exception in approach 2:', err.message)
      }
    }
    
    // Approach 3: Raw SQL query if approaches 1 and 2 failed
    if (!responses) {
      try {
        console.log('Trying approach 3: Raw SQL query')
        const { data, error } = await supabaseClient.rpc(
          'execute_sql',
          { 
            query: `SELECT * FROM survey_responses WHERE order_id = '${orderId}'` 
          }
        )
        
        if (error) {
          console.error('Error in approach 3:', error.message)
          console.log('Raw SQL not available, falling back to simple query')
        } else if (data && data.length > 0) {
          console.log(`Approach 3 successful, found ${data.length} responses`)
          responses = data
        } else {
          console.log('Approach 3: No data found or function may not exist')
        }
      } catch (err) {
        console.error('Exception in approach 3:', err.message)
      }
    }
    
    // Fallback approach: Direct REST API call
    if (!responses) {
      try {
        console.log('Trying fallback approach: Direct API call')
        const apiUrl = `${Deno.env.get('SUPABASE_URL')}/rest/v1/survey_responses?order_id=eq.${encodeURIComponent(orderId)}`
        
        const apiResponse = await fetch(apiUrl, {
          headers: {
            'apikey': Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        })
        
        if (!apiResponse.ok) {
          throw new Error(`API request failed with status ${apiResponse.status}`)
        }
        
        const data = await apiResponse.json()
        if (data && data.length > 0) {
          console.log(`Fallback approach successful, found ${data.length} responses`)
          responses = data
        } else {
          console.log('Fallback approach: No data found')
        }
      } catch (err) {
        console.error('Exception in fallback approach:', err.message)
      }
    }
    
    // Attempt to verify if the order exists
    try {
      const { data: orderData, error: orderError } = await supabaseClient
        .from('orders')
        .select('id')
        .eq('id', orderId)
        .single()
        
      if (orderError) {
        console.error('Error verifying order:', orderError.message)
      } else if (orderData) {
        console.log(`Order verified to exist: ${orderData.id}`)
      } else {
        console.log('Order not found in database')
      }
    } catch (err) {
      console.error('Exception verifying order:', err.message)
    }
    
    // Final check
    if (responses && responses.length > 0) {
      console.log(`Found ${responses.length} responses`)
      return new Response(
        JSON.stringify({ responses }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } else {
      console.log('No responses found after all attempts')
      // Check if there's a query error to return or return empty array
      if (queryError) {
        throw queryError
      } else {
        return new Response(
          JSON.stringify({ responses: [] }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }
    }
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
