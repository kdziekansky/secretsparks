
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as crypto from "https://deno.land/std@0.190.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400"
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
  console.log(`Admin verify code function called with method: ${req.method}`);
  console.log(`Listening on ${req.url}`);
  
  // Obsługa zapytań CORS preflight
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    // Sprawdź nagłówek Origin, ograniczając dostęp tylko do znanej domeny
    const origin = req.headers.get("Origin") || "*";
    console.log(`Request from origin: ${origin}`);
    
    // W produkcji powinno się ograniczyć tylko do konkretnej domeny
    const allowedOrigins = [
      "http://localhost:3000", 
      "http://localhost:5173", 
      "https://secretsparks.pl",
      "https://secret-sparks.netlify.app",
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

    // Sprawdź, czy body jest dostępne
    if (req.method !== "POST") {
      console.error("Method not allowed:", req.method);
      return new Response(
        JSON.stringify({ error: "Method not allowed. Use POST." }),
        { status: 405, headers: secureHeaders }
      );
    }

    // Debugowanie body żądania
    let bodyText;
    try {
      bodyText = await req.text();
      console.log("Request body text:", bodyText);
    } catch (err) {
      console.error("Cannot read request body:", err);
      return new Response(
        JSON.stringify({ error: "Cannot read request body" }),
        { status: 400, headers: secureHeaders }
      );
    }
    
    // Parsuj JSON
    let body;
    try {
      body = JSON.parse(bodyText);
      console.log("Parsed body:", body);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: secureHeaders }
      );
    }
    
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
      codeExists: !!correctAdminCode,
      saltValue: secretSalt ? "EXISTS (not showing)" : "NOT EXISTS",
      codeValue: correctAdminCode ? "EXISTS (not showing)" : "NOT EXISTS"
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
    
    // Weryfikacja kodu - używamy tylko bezpiecznej metody porównania hashy
    const isValid = inputHash === correctHash;
    
    console.log("Weryfikacja kodu administratora:", isValid ? "Sukces" : "Niepowodzenie");
    console.log("Obliczony hash wejściowy (pierwsze 10 znaków):", inputHash.substring(0, 10)); 
    console.log("Oczekiwany hash (pierwsze 10 znaków):", correctHash.substring(0, 10));
    
    // Zapisz próbę logowania w bazie danych, aby śledzić potencjalne ataki
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Zapisz próbę logowania w tabeli (jeśli istnieje)
    try {
      await supabaseAdmin
        .from('admin_login_attempts')
        .insert([{ 
          code_hash: inputHash.substring(0, 10), // Zapisujemy tylko część hashu
          successful: isValid,
          ip_hash: await sha256(req.headers.get("x-forwarded-for") || "unknown")
        }]);
        
      console.log("Zapisano próbę logowania w bazie danych");
    } catch (err) {
      // Ignorujemy błąd jeśli tabela nie istnieje
      console.error("Błąd zapisywania próby logowania:", err);
    }

    return new Response(
      JSON.stringify({ verified: isValid }),
      { status: 200, headers: secureHeaders }
    );

  } catch (error) {
    console.error("Błąd podczas weryfikacji kodu administratora:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Wystąpił błąd podczas weryfikacji kodu",
        details: error.message || "Nieznany błąd" 
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
