import Link from 'next/link';

import { AuthStatusCard } from '@/components/auth-status-card';
import { AppShell } from '@/components/app-shell';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';
import { getInitialAuthSnapshot } from '@/lib/auth/session';
import { connectedApps, dashboardStats, recentRuns } from '@/lib/mock-data';

function statusClass(status: string) {
  if (status === 'Healthy' || status === 'Connected') {
    return 'badge badge-success';
  }

  if (status === 'Draft' || status === 'Pending') {
    return 'badge badge-warning';
  }

  if (status === 'Needs review') {
    return 'badge badge-danger';
  }

  return 'badge badge-neutral';
}

export default function DashboardPage() {
  const session = getInitialAuthSnapshot();

  return (
    <AppShell
      title="Dashboard"
      description="A concise view of workspace health, workflow drafts, and connected apps."
      activePath="/dashboard"
      actions={
        <>
          <Link href="/templates" className="button button-secondary">
            Browse templates
          </Link>
          <span className="button button-primary" aria-disabled="true">
            AI draft mode
          </span>
        </>
      }
    >
      <section className="auth-grid">
        <AuthStatusCard initialSession={session} />
        <WorkspaceSwitcher initialSession={session} />
      </section>

      <section className="panel" style={{ marginTop: '16px' }}>
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Protected concept</p>
            <h3>Session-gated access comes later</h3>
          </div>
        </div>
        <p className="panel-copy">
          This Phase 2 scaffold keeps auth mock-safe. The dashboard shows the user, organization, and workspace concept
          now, while real protected routes and server-side session checks can be wired once Supabase is configured.
        </p>
      </section>

      <section className="stats-grid section-stack" aria-label="Dashboard statistics">
        {dashboardStats.map((stat) => (
          <article key={stat.label} className="metric-card">
            <p className="metric-label">{stat.label}</p>
            <p className="metric-value">{stat.value}</p>
            <p className="metric-detail">{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Recent activity</p>
              <h3>Latest workflow drafts and runs</h3>
            </div>
          </div>

          <ul className="activity-list">
            {recentRuns.map((run) => (
              <li key={run.name}>
                <div className="activity-main">
                  <strong>{run.name}</strong>
                  <p>{run.detail}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={statusClass(run.status)}>{run.status}</span>
                  <p className="metric-detail" style={{ marginTop: '8px' }}>
                    {run.timestamp}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Connected apps</p>
              <h3>Integration status</h3>
            </div>
          </div>

          <ul className="app-list">
            {connectedApps.map((app) => (
              <li key={app.name}>
                <div className="app-mainline">
                  <strong>{app.name}</strong>
                  <p>{app.purpose}</p>
                </div>
                <span className={statusClass(app.status)}>{app.status}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel" style={{ marginTop: '16px' }}>
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Safety</p>
            <h3>Draft-only guardrails stay visible</h3>
          </div>
        </div>
        <p className="panel-copy">
          This first phase keeps the product experience simple while making the safety model obvious: AI can draft,
          suggest, and validate, but users approve before anything becomes live.
        </p>
      </section>
    </AppShell>
  );
}
