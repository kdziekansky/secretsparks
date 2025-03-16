
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Sprawdź nagłówek Origin, ograniczając dostęp tylko do znanej domeny
    const origin = req.headers.get("Origin") || "*";
    const allowedOrigins = [
      "http://localhost:3000", 
      "http://localhost:5173", 
      "https://secretsparks.pl",
      new URL(Deno.env.get("SUPABASE_URL") || "").origin
    ];
    
    const secureHeaders = {
      ...corsHeaders,
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      "Content-Type": "application/json",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
    };

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: secureHeaders }
      );
    }

    // Get authorization token
    const token = authHeader.replace('Bearer ', '');
    
    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Verify the user is authenticated and get the user from the JWT token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid authorization token" }),
        { status: 401, headers: secureHeaders }
      );
    }

    // Get the request body
    const requestData = await req.json();
    const { email, password, action } = requestData;

    // Action to create a new admin user
    if (action === "create" && email && password) {
      // Check if the requester has permission to create an admin
      // This typically would check for a specific admin role
      const { data: adminCheck, error: adminCheckError } = await supabaseAdmin
        .from('admin_users')
        .select('email')
        .eq('email', user.email)
        .single();
        
      if (adminCheckError || !adminCheck) {
        return new Response(
          JSON.stringify({ error: "You don't have permission to create admin users" }),
          { status: 403, headers: secureHeaders }
        );
      }
      
      // Check if admin user already exists
      const { data: existingAdmin, error: existingAdminError } = await supabaseAdmin
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();
        
      if (existingAdmin) {
        return new Response(
          JSON.stringify({ error: "Admin user already exists" }),
          { status: 400, headers: secureHeaders }
        );
      }
      
      // Walidacja siły hasła
      if (!password || typeof password !== 'string' || password.length < 12) {
        return new Response(
          JSON.stringify({ error: "Password must be at least 12 characters long" }),
          { status: 400, headers: secureHeaders }
        );
      }

      // Sprawdzenie złożoności hasła
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

      if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
        return new Response(
          JSON.stringify({ 
            error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" 
          }),
          { status: 400, headers: secureHeaders }
        );
      }
      
      // Create a user in auth if it doesn't exist
      const { data: authUserCheck, error: authUserCheckError } = await supabaseAdmin.auth.admin.getUserByEmail(email);
      
      if (!authUserCheck) {
        // Create the user in auth
        const { data: newAuthUser, error: newAuthUserError } = await supabaseAdmin.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true
        });
        
        if (newAuthUserError) {
          return new Response(
            JSON.stringify({ error: `Failed to create auth user: ${newAuthUserError.message}` }),
            { status: 500, headers: secureHeaders }
          );
        }
      }
      
      // Hash the password for storage in admin_users
      const hashedPassword = await bcrypt.hash(password);
      
      // Create the admin user
      const { data: newAdmin, error: newAdminError } = await supabaseAdmin
        .from('admin_users')
        .insert([{ email: email, password: hashedPassword }]);
        
      if (newAdminError) {
        return new Response(
          JSON.stringify({ error: `Failed to create admin user: ${newAdminError.message}` }),
          { status: 500, headers: secureHeaders }
        );
      }
      
      return new Response(
        JSON.stringify({ success: true, message: "Admin user created successfully" }),
        { status: 200, headers: secureHeaders }
      );
    }
    
    // Action to update an existing admin's password
    if (action === "update" && password) {
      // Check if the user exists in the admin_users table
      const { data: adminUser, error: adminError } = await supabaseAdmin
        .from('admin_users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (adminError || !adminUser) {
        return new Response(
          JSON.stringify({ error: "User is not an admin" }),
          { status: 403, headers: secureHeaders }
        );
      }

      // Walidacja siły hasła
      if (!password || typeof password !== 'string' || password.length < 12) {
        return new Response(
          JSON.stringify({ error: "Password must be at least 12 characters long" }),
          { status: 400, headers: secureHeaders }
        );
      }

      // Sprawdzenie złożoności hasła
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

      if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
        return new Response(
          JSON.stringify({ 
            error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" 
          }),
          { status: 400, headers: secureHeaders }
        );
      }

      // Update auth user password
      const { error: authUpdateError } = await supabaseAdmin.auth.admin.updateUserById(
        user.id,
        { password: password }
      );
      
      if (authUpdateError) {
        return new Response(
          JSON.stringify({ error: `Failed to update auth password: ${authUpdateError.message}` }),
          { status: 500, headers: secureHeaders }
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password);

      // Update the admin user's password
      const { error: updateError } = await supabaseAdmin
        .from('admin_users')
        .update({ password: hashedPassword })
        .eq('email', user.email);

      if (updateError) {
        return new Response(
          JSON.stringify({ error: updateError.message }),
          { status: 500, headers: secureHeaders }
        );
      }

      // Zapisz informację o zmianie hasła
      try {
        await supabaseAdmin
          .from('admin_password_history')
          .insert([{ 
            admin_email: user.email,
            changed_at: new Date().toISOString(),
          }]);
      } catch (err) {
        // Ignoruj błąd jeśli tabela nie istnieje
        console.error("Błąd zapisywania historii hasła:", err);
      }

      return new Response(
        JSON.stringify({ success: true, message: "Password updated successfully" }),
        { status: 200, headers: secureHeaders }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Invalid action or missing parameters" }),
      { status: 400, headers: secureHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
