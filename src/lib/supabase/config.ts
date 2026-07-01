export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

type HeaderSource = Pick<Headers, 'get'>;

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function decodeBase64Url(value: string): string | null {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');

  try {
    if (typeof atob === 'function') {
      return atob(padded);
    }
  } catch {
    // fall through to Buffer
  }

  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(padded, 'base64').toString('utf8');
    }
  } catch {
    return null;
  }

  return null;
}

function extractProjectRef(token: string): string | null {
  const payload = token.split('.')[1];

  if (!payload) {
    return null;
  }

  const decoded = decodeBase64Url(payload);

  if (!decoded) {
    return null;
  }

  try {
    const parsed = JSON.parse(decoded) as Record<string, unknown>;
    const ref = parsed.ref ?? parsed.project_ref;

    if (typeof ref === 'string' && ref.trim()) {
      return ref.trim();
    }
  } catch {
    return null;
  }

  return null;
}

function deriveSupabaseUrl(rawUrl: string, anonKey: string): string | null {
  if (isHttpUrl(rawUrl)) {
    return rawUrl;
  }

  const projectRef = extractProjectRef(anonKey) ?? extractProjectRef(rawUrl);

  if (projectRef) {
    return `https://${projectRef}.supabase.co`;
  }

  return null;
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? '';

  if (!url || !anonKey) {
    return null;
  }

  const normalizedUrl = deriveSupabaseUrl(url, anonKey);

  if (!normalizedUrl) {
    return null;
  }

  return { url: normalizedUrl, anonKey };
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
    const normalizedUrl = deriveSupabaseUrl(url, anonKey);

    if (normalizedUrl) {
      return { url: normalizedUrl, anonKey };
    }
  }

  return getSupabaseConfig();
}
