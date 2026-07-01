export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

type HeaderSource = Pick<Headers, 'get'>;

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? '';

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

export function getSupabaseModeLabel(): string {
  return isSupabaseConfigured() ? 'Supabase scaffold ready' : 'Mock mode';
}

export function getSupabaseConfigFromHeaders(source: HeaderSource): SupabaseConfig | null {
  const url = source.get('x-novemcore-supabase-url')?.trim() ?? '';
  const anonKey = source.get('x-novemcore-supabase-anon-key')?.trim() ?? '';

  if (url && anonKey) {
    return { url, anonKey };
  }

  return getSupabaseConfig();
}
