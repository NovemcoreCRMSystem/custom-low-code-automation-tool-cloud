import Link from 'next/link';

import { AuthForm } from '@/components/auth-form';
import { AuthStatusCard } from '@/components/auth-status-card';
import { getServerAuthSnapshot } from '@/lib/auth/server-session';

type SignupPageProps = {
  searchParams?: Promise<{ next?: string | string[] }>;
};

function resolveSafeNextPath(nextValue?: string | string[]): string {
  const candidate = Array.isArray(nextValue) ? nextValue[0] : nextValue;

  if (candidate && candidate.startsWith('/') && !candidate.startsWith('//')) {
    return candidate;
  }

  return '/dashboard';
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const session = await getServerAuthSnapshot({ redirectIfAuthenticatedTo: '/dashboard' });
  const query = searchParams ? await Promise.resolve(searchParams) : undefined;
  const nextPath = resolveSafeNextPath(query?.next);

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-copy">
          <p className="eyebrow">Novemcore auth scaffold</p>
          <h1>Create your workspace preview</h1>
          <p>
            The signup flow collects the minimum organization and workspace details needed for the Novemcore wrapper
            concept. It remains mock-safe until Supabase is configured.
          </p>

          <AuthStatusCard initialSession={session} compact />

          <p className="auth-footnote">
            Already have a preview account? <Link href="/auth/login">Sign in here</Link>.
          </p>
        </div>

        <div className="auth-panel">
          <AuthForm mode="signup" nextPath={nextPath} />
        </div>
      </section>
    </main>
  );
}
