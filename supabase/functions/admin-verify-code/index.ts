
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
  // Obsługa zapytań CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Sprawdź nagłówek Origin, ograniczając dostęp tylko do znanej domeny
    const origin = req.headers.get("Origin") || "*";
    // W produkcji powinno się ograniczyć tylko do konkretnej domeny
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

    const { code } = await req.json();
    
    if (!code) {
      return new Response(
        JSON.stringify({ error: "Brak kodu weryfikacyjnego" }),
        { status: 400, headers: secureHeaders }
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
    
    // Usuwamy ukrytą kombinację - nie jest to bezpieczne rozwiązanie
    // Przeniesiono całą logikę do weryfikacji hashem
    
    // Weryfikacja kodu - używamy tylko bezpiecznej metody porównania hashy
    const isValid = inputHash === correctHash;
    
    console.log("Weryfikacja kodu administratora:", isValid ? "Sukces" : "Niepowodzenie");
    
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
      JSON.stringify({ error: "Wystąpił błąd podczas weryfikacji kodu" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
