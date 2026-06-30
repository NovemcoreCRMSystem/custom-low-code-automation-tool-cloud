import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

import { getSupabaseConfig } from './config';

export async function getSupabaseServerClient() {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Mock-safe scaffold: request cookies are not wired yet.
        }
      },
    },
  });
}
