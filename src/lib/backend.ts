import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_BACKEND_URL?.trim();
const anonKey = import.meta.env.VITE_BACKEND_ANON_KEY?.trim();

export const isBackendConfigured = Boolean(url && anonKey);

export const backend: SupabaseClient | null = isBackendConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export function requireBackend(): SupabaseClient {
  if (!backend) {
    throw new Error("backend_not_configured");
  }
  return backend;
}
