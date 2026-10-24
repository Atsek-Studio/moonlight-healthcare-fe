import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const isSupabaseConfigured = Boolean(url && key);
export const supabase = isSupabaseConfigured ? createClient(url, key) : null;
// The unauthenticated reader can only fetch published content under RLS.
export const publicSupabase = isSupabaseConfigured ? createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: 'moonlight-public-reader'
  }
}) : null;
export const isLocalEditor = !isSupabaseConfigured && import.meta.env.DEV;
