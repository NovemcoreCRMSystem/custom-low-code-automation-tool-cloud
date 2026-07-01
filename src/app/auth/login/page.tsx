import Link from 'next/link';
import { headers } from 'next/headers';

import { AuthForm } from '@/components/auth-form';
import { AuthStatusCard } from '@/components/auth-status-card';
import { getServerAuthSnapshot } from '@/lib/auth/server-session';
import { getSupabaseConfigFromHeaders } from '@/lib/supabase/config';

type LoginPageProps = {
  searchParams?: Promise<{ next?: string | string[] }>;
};

function resolveSafeNextPath(nextValue?: string | string[]): string {
  const candidate = Array.isArray(nextValue) ? nextValue[0] : nextValue;

  if (candidate && candidate.startsWith('/') && !candidate.startsWith('//')) {
    return candidate;
  }

  return '/dashboard';
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const requestHeaders = await headers();
  const supabaseConfig = getSupabaseConfigFromHeaders(requestHeaders);
  const session = await getServerAuthSnapshot({ redirectIfAuthenticatedTo: '/dashboard', supabaseConfig });
  const query = searchParams ? await Promise.resolve(searchParams) : undefined;
  const nextPath = resolveSafeNextPath(query?.next);

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-copy">
          <p className="eyebrow">Novemcore auth scaffold</p>
          <h1>Sign in to your workspace</h1>
          <p>
            This login flow is safe to use without Supabase. If the env vars are missing, it falls back to a local
            preview session and clearly marks the app as mock mode.
          </p>

          <AuthStatusCard initialSession={session} compact />

          <p className="auth-footnote">
            Need a fresh preview account? <Link href="/auth/signup">Create one here</Link>.
          </p>
        </div>

        <div className="auth-panel">
          <AuthForm mode="login" nextPath={nextPath} supabaseConfig={supabaseConfig} />
        </div>
      </section>
    </main>
  );
}
