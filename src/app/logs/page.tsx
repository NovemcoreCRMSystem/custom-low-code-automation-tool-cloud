import { AppShell } from '@/components/app-shell';
import { recentRuns } from '@/lib/mock-data';

function statusClass(status: string) {
  if (status === 'Healthy') {
    return 'badge badge-success';
  }

  if (status === 'Draft') {
    return 'badge badge-warning';
  }

  if (status === 'Needs review') {
    return 'badge badge-danger';
  }

  return 'badge badge-neutral';
}

export default function LogsPage() {
  return (
    <AppShell
      title="Logs"
      description="A simple audit-friendly log view for runs, drafts, and manual review states."
      activePath="/logs"
      actions={<span className="button button-secondary" aria-disabled="true">Export log snapshot</span>}
    >
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Run history</p>
            <h3>Recent events</h3>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Workflow</th>
                <th>Status</th>
                <th>When</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {recentRuns.map((run) => (
                <tr key={run.name}>
                  <td>
                    <strong>{run.name}</strong>
                  </td>
                  <td>
                    <span className={statusClass(run.status)}>{run.status}</span>
                  </td>
                  <td>{run.timestamp}</td>
                  <td>{run.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel" style={{ marginTop: '16px' }}>
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Audit trail</p>
              <h3>What the logs are for</h3>
            </div>
          </div>
          <p className="panel-copy">
            Logs are intentionally plain and readable in this phase so the product stays approachable while still
            supporting future review, approval, and compliance workflows.
          </p>
        </article>

        <article className="panel" style={{ marginTop: '16px' }}>
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Status</p>
              <h3>Current guardrails</h3>
            </div>
          </div>
          <ul className="feature-list">
            <li>
              <div>
                <strong>Draft-only execution</strong>
                <p>No live publishing from the AI layer yet.</p>
              </div>
            </li>
            <li>
              <div>
                <strong>Mock data only</strong>
                <p>No Supabase or Activepieces connection in this phase.</p>
              </div>
            </li>
          </ul>
        </article>
      </section>
    </AppShell>
  );
}
