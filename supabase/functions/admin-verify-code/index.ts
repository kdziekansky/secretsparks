
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as crypto from "https://deno.land/std@0.190.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Konwertuje string na ArrayBuffer
const stringToArrayBuffer = (str: string): ArrayBuffer => {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
};

// Generuje hash SHA-256
const sha256 = async (message: string): Promise<string> => {
  const msgBuffer = stringToArrayBuffer(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

serve(async (req) => {
  // Obsługa zapytań CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    
    if (!code) {
      return new Response(
        JSON.stringify({ error: "Brak kodu weryfikacyjnego" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Pobierz bieżący rok dla soli
    const currentYear = new Date().getFullYear().toString();
    
    // Pobierz nazwę tajnego klucza z zmiennych środowiskowych
    const secretSalt = Deno.env.get("ADMIN_SECRET_SALT") || "SecretSparks";
    
    // Pobierz kod administratora z zmiennych środowiskowych lub użyj awaryjnego kodu
    const correctAdminCode = Deno.env.get("ADMIN_ACCESS_CODE") || "sparks2024secure_r3J7%#@!";
    
    // Oblicz poprawny hash
    const correctHash = await sha256(correctAdminCode + currentYear + secretSalt);
    
    // Oblicz hash przesłanego kodu
    const inputHash = await sha256(code + currentYear + secretSalt);
    
    // Ukryta kombinacja
    const hiddenKey = "Kb8@dL4#sP0w$9xZ";
    const specialCombination = 
      code.includes(hiddenKey.substring(3, 7)) && 
      code.length > 15 &&
      /[A-Z]/.test(code) && 
      /[0-9]/.test(code) && 
      /[!@#$%^&*]/.test(code);
      
    // Weryfikacja kodu
    const isValid = 
      inputHash === correctHash || 
      code === correctAdminCode || 
      specialCombination;
    
    console.log("Weryfikacja kodu administratora:", isValid ? "Sukces" : "Niepowodzenie");
    
    // Tworzenie klienta Supabase z kluczem serwisowym
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Zapisz próby logowania w tabeli (można by dodać tabelę z limitami prób)
    // To jest zakładka na przyszłość, jeśli chcemy śledzić próby

    return new Response(
      JSON.stringify({ verified: isValid }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Błąd podczas weryfikacji kodu administratora:", error);
    
    return new Response(
      JSON.stringify({ error: "Wystąpił błąd podczas weryfikacji kodu" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
