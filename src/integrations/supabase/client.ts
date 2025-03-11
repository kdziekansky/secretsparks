
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Default values from .env.example for development purposes
const DEFAULT_URL = "https://bqbgrjpxufblrgcoxpfk.supabase.co";
const DEFAULT_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxYmdyanB4dWZibHJnY294cGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1Mzk4NzUsImV4cCI6MjA1NzExNTg3NX0.kSryhe5Z4BILp_ss5LpSxanGSvx4HZzZtVzYia4bgik";

// Try to get from environment variables first, fall back to defaults if not available
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || DEFAULT_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;

// Log configuration status
console.log("Inicjalizacja Supabase klienta");
console.log("Supabase URL configured:", SUPABASE_URL ? "YES" : "NO");
console.log("Supabase ANON KEY configured:", SUPABASE_ANON_KEY ? "YES" : "NO");
console.log("Using URL:", SUPABASE_URL);

// Create the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Additional validation
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("Uwaga: Używane są domyślne wartości dla Supabase. W środowisku produkcyjnym należy ustawić zmienne VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY.");
}
