
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Poprawione nagłówki CORS, które zawierają nagłówek "prefer"
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, prefer',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
}

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

    // Handle both JSON body and URL parameter formats
    let orderId = '';
    const url = new URL(req.url);
    const urlParamOrderId = url.searchParams.get('orderId');
    
    if (urlParamOrderId) {
      // If orderId is in URL parameters
      orderId = urlParamOrderId;
      console.log('Using orderId from URL parameters:', orderId);
    } else {
      // If orderId is in request body
      try {
        const body = await req.json();
        orderId = body.orderId;
        console.log('Using orderId from request body:', orderId);
      } catch (error) {
        console.error('Error parsing request body:', error.message);
        throw new Error('Invalid request format - could not parse body');
      }
    }

    if (!orderId) {
      throw new Error('Missing orderId parameter');
    }

    console.log('Fetching responses for order:', orderId);
    
    // Try multiple approaches to ensure we get the data
    let responses = null;
    let queryError = null;
    
    // Approach 1: Direct SQL query for maximum reliability
    try {
      console.log('Trying approach 1: Direct SQL query');
      const { data, error } = await supabaseClient.rpc(
        'execute_sql',
        { 
          query: `SELECT * FROM survey_responses WHERE order_id = '${orderId}'` 
        }
      );
      
      if (error) {
        console.error('Error in approach 1:', error.message);
        console.log('Direct SQL not available, falling back to simple query');
      } else if (data && data.length > 0) {
        console.log(`Approach 1 successful, found ${data.length} responses`);
        responses = data;
      } else {
        console.log('Approach 1: No data found');
      }
    } catch (err) {
      console.error('Exception in approach 1:', err.message);
    }
    
    // Approach 2: Standard query if approach 1 failed
    if (!responses) {
      try {
        console.log('Trying approach 2: Standard query');
        const { data, error } = await supabaseClient
          .from('survey_responses')
          .select('*')
          .eq('order_id', orderId);
        
        if (error) {
          console.error('Error in approach 2:', error.message);
          queryError = error;
        } else if (data && data.length > 0) {
          console.log(`Approach 2 successful, found ${data.length} responses`);
          responses = data;
        } else {
          console.log('Approach 2: No data found');
        }
      } catch (err) {
        console.error('Exception in approach 2:', err.message);
      }
    }
    
    // Approach 3: Direct REST API call
    if (!responses) {
      try {
        console.log('Trying approach 3: Direct API call');
        const apiUrl = `${Deno.env.get('SUPABASE_URL')}/rest/v1/survey_responses?order_id=eq.${encodeURIComponent(orderId)}`;
        
        const apiResponse = await fetch(apiUrl, {
          headers: {
            'apikey': Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        });
        
        if (!apiResponse.ok) {
          throw new Error(`API request failed with status ${apiResponse.status}`);
        }
        
        const data = await apiResponse.json();
        if (data && data.length > 0) {
          console.log(`Approach 3 successful, found ${data.length} responses`);
          responses = data;
        } else {
          console.log('Approach 3: No data found');
        }
      } catch (err) {
        console.error('Exception in approach 3:', err.message);
      }
    }
    
    // Approach 4: Try using a filter instead of eq
    if (!responses) {
      try {
        console.log('Trying approach 4: Using filter instead of eq');
        const { data, error } = await supabaseClient
          .from('survey_responses')
          .select('*')
          .filter('order_id', 'eq', orderId);
          
        if (error) {
          console.error('Error in approach 4:', error.message);
        } else if (data && data.length > 0) {
          console.log(`Approach 4 successful, found ${data.length} responses`);
          responses = data;
        } else {
          console.log('Approach 4: No data found');
        }
      } catch (err) {
        console.error('Exception in approach 4:', err.message);
      }
    }
    
    // Attempt to verify if the order exists
    try {
      const { data: orderData, error: orderError } = await supabaseClient
        .from('orders')
        .select('id')
        .eq('id', orderId)
        .single();
        
      if (orderError) {
        console.error('Error verifying order:', orderError.message);
      } else if (orderData) {
        console.log(`Order verified to exist: ${orderData.id}`);
      } else {
        console.log('Order not found in database');
      }
    } catch (err) {
      console.error('Exception verifying order:', err.message);
    }
    
    // Validate response data before returning
    if (responses && Array.isArray(responses) && responses.length > 0) {
      // Validate each response has the required fields
      const validatedResponses = responses.map(response => {
        // Ensure required fields have values or defaults
        return {
          id: response.id || `temp-${Math.random().toString(36).substring(2, 9)}`,
          order_id: response.order_id || orderId,
          question_id: response.question_id || '',
          answer: typeof response.answer === 'number' ? response.answer : 0,
          user_type: response.user_type || 'user',
          created_at: response.created_at || new Date().toISOString(),
          user_gender: response.user_gender || null,
          partner_gender: response.partner_gender || null,
          game_level: response.game_level || null
        };
      });
      
      console.log(`Found and validated ${validatedResponses.length} responses`);
      return new Response(
        JSON.stringify({ responses: validatedResponses }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } else {
      console.log('No responses found after all attempts or validation failed');
      // Create a basic sample response for testing if requested
      const includeSample = url.searchParams.get('includeSample') === 'true';
      
      if (includeSample) {
        console.log('Including sample data as requested');
        const sampleResponses = [
          {
            id: `sample-1-${Date.now()}`,
            order_id: orderId,
            question_id: 'q1',
            answer: 2,
            user_type: 'user',
            created_at: new Date().toISOString(),
            user_gender: 'male',
            partner_gender: 'female',
            game_level: 'discover'
          },
          {
            id: `sample-2-${Date.now()}`,
            order_id: orderId,
            question_id: 'q2',
            answer: 3,
            user_type: 'partner',
            created_at: new Date().toISOString(),
            user_gender: 'female',
            partner_gender: 'male',
            game_level: 'discover'
          }
        ];
        
        return new Response(
          JSON.stringify({ responses: sampleResponses, isSample: true }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }
      
      // Check if there's a query error to return or return empty array
      if (queryError) {
        throw queryError;
      } else {
        return new Response(
          JSON.stringify({ responses: [] }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
