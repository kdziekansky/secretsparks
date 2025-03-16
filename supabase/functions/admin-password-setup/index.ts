
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    
    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get the request body
    const requestData = await req.json();
    const { email, password, action, firstAdmin } = requestData;

    // Sprawdź, czy tabela admin_users jest pusta (brak administratorów)
    const { count, error: countError } = await supabaseAdmin
      .from('admin_users')
      .select('*', { count: 'exact', head: true });
      
    const isEmptyAdminTable = count === 0;
    console.log("Czy tabela admin_users jest pusta:", isEmptyAdminTable);
    
    // Obsługa tworzenia pierwszego administratora
    if (firstAdmin === true && isEmptyAdminTable) {
      console.log("Tworzenie pierwszego administratora:", email);
      
      if (!email || !password || typeof password !== 'string' || password.length < 8) {
        return new Response(
          JSON.stringify({ error: "Email wymagany i hasło musi mieć co najmniej 8 znaków" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Sprawdź, czy użytkownik istnieje w auth
      const { data: authUserCheck, error: authUserCheckError } = await supabaseAdmin.auth.admin.getUserByEmail(email);
      
      if (!authUserCheck) {
        // Utwórz użytkownika w auth jeśli nie istnieje
        const { data: newAuthUser, error: newAuthUserError } = await supabaseAdmin.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true
        });
        
        if (newAuthUserError) {
          return new Response(
            JSON.stringify({ error: `Nie udało się utworzyć użytkownika auth: ${newAuthUserError.message}` }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
      
      // Hashuj hasło do przechowywania
      const hashedPassword = await bcrypt.hash(password);
      
      // Utwórz administratora
      const { data: newAdmin, error: newAdminError } = await supabaseAdmin
        .from('admin_users')
        .insert([{ email: email, password: hashedPassword }]);
        
      if (newAdminError) {
        return new Response(
          JSON.stringify({ error: `Nie udało się utworzyć administratora: ${newAdminError.message}` }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Pierwszy administrator utworzony pomyślnie",
          isFirstAdmin: true
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Dla pozostałych akcji wymagamy uwierzytelnienia
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Brakuje nagłówka autoryzacji" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get authorization token
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the user is authenticated and get the user from the JWT token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Nieprawidłowy token autoryzacji" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
          JSON.stringify({ error: "Nie masz uprawnień do tworzenia administratorów" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
          JSON.stringify({ error: "Administrator już istnieje" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
            JSON.stringify({ error: `Nie udało się utworzyć użytkownika auth: ${newAuthUserError.message}` }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
          JSON.stringify({ error: `Nie udało się utworzyć administratora: ${newAdminError.message}` }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ success: true, message: "Administrator utworzony pomyślnie" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
          JSON.stringify({ error: "Użytkownik nie jest administratorem" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (!password || typeof password !== 'string' || password.length < 8) {
        return new Response(
          JSON.stringify({ error: "Hasło musi mieć co najmniej 8 znaków" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Update auth user password
      const { error: authUpdateError } = await supabaseAdmin.auth.admin.updateUserById(
        user.id,
        { password: password }
      );
      
      if (authUpdateError) {
        return new Response(
          JSON.stringify({ error: `Nie udało się zaktualizować hasła auth: ${authUpdateError.message}` }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Hasło zaktualizowane pomyślnie" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Nieprawidłowa akcja lub brakujące parametry" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
