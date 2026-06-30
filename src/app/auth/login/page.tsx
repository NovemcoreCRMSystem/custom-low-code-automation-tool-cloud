import Link from 'next/link';

import { AuthForm } from '@/components/auth-form';
import { AuthStatusCard } from '@/components/auth-status-card';
import { getInitialAuthSnapshot } from '@/lib/auth/session';

export default function LoginPage() {
  const session = getInitialAuthSnapshot();

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
          <AuthForm mode="login" />
        </div>
      </section>
    </main>
  );
}
