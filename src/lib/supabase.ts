import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Accept the old Vite variable names too, so the existing Vercel env vars keep working.
const url =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const anonKey =
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.VITE_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

/** Server-only Supabase client (anon key, RLS applies). Null when not configured. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null
  client ??= createClient(url, anonKey, { auth: { persistSession: false } })
  return client
}
