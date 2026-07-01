import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseConfig, type SupabaseConfig } from './config';

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(configOverride?: SupabaseConfig | null): SupabaseClient | null {
  const config = configOverride ?? getSupabaseConfig();

  if (!config) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(config.url, config.anonKey);
  }

  return browserClient;
}
