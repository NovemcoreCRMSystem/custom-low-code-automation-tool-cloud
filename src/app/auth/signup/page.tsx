import Link from 'next/link';

import { AuthForm } from '@/components/auth-form';
import { AuthStatusCard } from '@/components/auth-status-card';
import { getInitialAuthSnapshot } from '@/lib/auth/session';

export default function SignupPage() {
  const session = getInitialAuthSnapshot();

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
          <AuthForm mode="signup" />
        </div>
      </section>
    </main>
  );
}
