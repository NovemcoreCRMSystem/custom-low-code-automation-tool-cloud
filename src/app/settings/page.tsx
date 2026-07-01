import { AuthStatusCard } from '@/components/auth-status-card';
import { AppShell } from '@/components/app-shell';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';
import { getServerAuthSnapshot } from '@/lib/auth/server-session';
import { settingsSections } from '@/lib/mock-data';

export default async function SettingsPage() {
  const session = await getServerAuthSnapshot({ redirectToLogin: '/auth/login?next=/settings' });

  return (
    <AppShell
      title="Settings"
      description="Workspace, safety, and usage settings for the Novemcore wrapper skeleton."
      activePath="/settings"
      session={session}
      actions={<span className="button button-secondary" aria-disabled="true">Save changes</span>}
    >
      <section className="auth-grid">
        <AuthStatusCard initialSession={session} />
        <WorkspaceSwitcher initialSession={session} />
      </section>

      <section className="panel" style={{ marginTop: '16px' }}>
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Profile concept</p>
            <h3>Organization and workspace are preview-only for now</h3>
          </div>
        </div>
        <p className="panel-copy">
          This scaffold shows where user profile, organization, and workspace settings will live. The values are mock
          data until Supabase and real auth are wired in a later phase.
        </p>
      </section>

      <section className="settings-grid">
        {settingsSections.map((section) => (
          <article key={section.title} className="settings-card">
            <div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>

            <ul className="settings-list">
              {section.items.map((item) => (
                <li key={item}>
                  <div className="settings-main">
                    <strong>{item}</strong>
                  </div>
                  <span className="badge badge-neutral">Mock</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="panel" style={{ marginTop: '16px' }}>
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Next phase</p>
            <h3>What settings will support later</h3>
          </div>
        </div>
        <p className="panel-copy">
          Future phases can add real organization membership, auth, secret storage, usage controls, and workflow
          approvals after the wrapper skeleton is stable.
        </p>
      </section>
    </AppShell>
  );
}
