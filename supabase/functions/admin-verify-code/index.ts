
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as crypto from "https://deno.land/std@0.190.0/crypto/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

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
  console.log(`Admin verify code function called with method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  
  // Obsługa żądań CORS preflight - to jest krytyczne dla cross-origin
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    // Ustawienie nagłówków odpowiedzi
    const secureHeaders = {
      ...corsHeaders,
      "Content-Type": "application/json"
    };

    // Sprawdź metodę żądania
    if (req.method !== "POST") {
      console.error("Method not allowed:", req.method);
      return new Response(
        JSON.stringify({ error: "Method not allowed. Use POST." }),
        { status: 405, headers: secureHeaders }
      );
    }

    // Próba odczytania i parsowania ciała żądania
    let body;
    try {
      body = await req.json();
      console.log("Parsed request body:", body);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return new Response(
        JSON.stringify({ error: "Invalid JSON body", details: err.message }),
        { status: 400, headers: secureHeaders }
      );
    }
    
    // Sprawdzenie kodu
    const { code } = body;
    
    if (!code) {
      console.error("Missing verification code");
      return new Response(
        JSON.stringify({ error: "Brak kodu weryfikacyjnego" }),
        { status: 400, headers: secureHeaders }
      );
    }

    // Sprawdzenie zmiennych środowiskowych
    const secretSalt = Deno.env.get("ADMIN_SECRET_SALT");
    const correctAdminCode = Deno.env.get("ADMIN_ACCESS_CODE");
    
    console.log("Environment variables check:", { 
      saltExists: !!secretSalt, 
      codeExists: !!correctAdminCode
    });
    
    if (!secretSalt || !correctAdminCode) {
      console.error("Missing environment variables:", { 
        secretSalt: !!secretSalt, 
        correctAdminCode: !!correctAdminCode 
      });
      
      return new Response(
        JSON.stringify({ 
          error: "Brak wymaganych zmiennych środowiskowych na serwerze", 
          missingVars: {
            ADMIN_SECRET_SALT: !secretSalt,
            ADMIN_ACCESS_CODE: !correctAdminCode
          }
        }),
        { status: 500, headers: secureHeaders }
      );
    }
    
    // Pobierz bieżący rok dla soli
    const currentYear = new Date().getFullYear().toString();
    
    // Oblicz poprawny hash
    const correctHash = await sha256(correctAdminCode + currentYear + secretSalt);
    
    // Oblicz hash przesłanego kodu
    const inputHash = await sha256(code + currentYear + secretSalt);
    
    // Weryfikacja kodu poprzez porównanie hashy
    const isValid = inputHash === correctHash;
    
    console.log("Weryfikacja kodu administratora:", isValid ? "Sukces" : "Niepowodzenie");
    console.log("Obliczony hash wejściowy (pierwsze 10 znaków):", inputHash.substring(0, 10)); 
    console.log("Oczekiwany hash (pierwsze 10 znaków):", correctHash.substring(0, 10));
    
    // Dla celów rozwojowych dodajemy informacje debugowania
    let debugInfo = {};
    if (!isValid) {
      debugInfo = {
        debug: {
          currentYear,
          inputHashPrefix: inputHash.substring(0, 10),
          correctHashPrefix: correctHash.substring(0, 10),
          saltExists: !!secretSalt,
          codeExists: !!correctAdminCode
        }
      };
    }
    
    // Zapisz próbę logowania w bazie danych
    try {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      await supabaseAdmin
        .from('admin_login_attempts')
        .insert([{ 
          code_hash: inputHash.substring(0, 10),
          successful: isValid,
          ip_hash: await sha256(req.headers.get("x-forwarded-for") || "unknown")
        }]);
        
      console.log("Zapisano próbę logowania w bazie danych");
    } catch (err) {
      // Ignorujemy błąd jeśli tabela nie istnieje
      console.error("Błąd zapisywania próby logowania:", err);
    }

    return new Response(
      JSON.stringify({ 
        verified: isValid,
        ...debugInfo
      }),
      { status: 200, headers: secureHeaders }
    );

  } catch (error) {
    console.error("Błąd podczas weryfikacji kodu administratora:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Wystąpił błąd podczas weryfikacji kodu",
        details: error.message || "Nieznany błąd",
        stack: error.stack
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
