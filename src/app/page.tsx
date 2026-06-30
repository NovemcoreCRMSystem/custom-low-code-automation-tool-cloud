import Link from 'next/link';

import { dashboardStats, navigation, workflowTemplates } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <main className="landing-page" style={{ padding: '24px 0 40px' }}>
      <section className="hero landing-hero">
        <div className="hero-copy">
          <p className="eyebrow">Novemcore AI Automation SaaS</p>
          <h1>Trusted automation for teams that need control.</h1>
          <p>
            Novemcore gives users a polished workspace for templates, logs, settings, and draft-only AI workflow
            creation. Activepieces remains the engine behind the scenes, but the product experience stays Novemcore.
          </p>

          <div className="hero-actions">
            <Link href="/dashboard" className="button button-primary">
              Open dashboard
            </Link>
            <a href="#product" className="button button-secondary">
              View product pillars
            </a>
          </div>

          <div className="hero-metrics" aria-label="Product snapshot">
            {dashboardStats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="hero-metric">
                <p className="card-kicker">{stat.label}</p>
                <strong>{stat.value}</strong>
                <p>{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-side">
          <article className="home-card">
            <p className="card-kicker">Navigation</p>
            <h3>Simple app shell</h3>
            <p>Clean routes for the first wrapper skeleton, ready for future auth and workspace logic.</p>
            <div className="template-tags" style={{ marginTop: '14px' }}>
              {navigation.map((item) => (
                <span key={item.href} className="chip">
                  {item.label}
                </span>
              ))}
            </div>
          </article>

          <article className="home-card">
            <p className="card-kicker">Workflow safety</p>
            <h3>Drafts only</h3>
            <p>
              AI suggestions are framed as drafts, with manual approval required before any risky action can be
              published or executed.
            </p>
          </article>
        </div>
      </section>

      <section id="product" className="home-section">
        <h2 className="home-section-title">Product pillars</h2>
        <div className="template-grid">
          {[
            {
              title: 'Novemcore first',
              text: 'The user-facing SaaS should feel like a standalone product, not a thin wrapper around engine internals.',
            },
            {
              title: 'Safe automation',
              text: 'Draft creation, validation, and approval flow stay separate from live execution.',
            },
            {
              title: 'Updateable engine',
              text: 'The implementation should preserve a path for future Activepieces updates.',
            },
            {
              title: 'Simple MVP',
              text: 'Start with a polished shell, mock data, and clear navigation before any deep integration work.',
            },
          ].map((item) => (
            <article key={item.title} className="template-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Starter templates</h2>
        <div className="template-grid">
          {workflowTemplates.slice(0, 2).map((template) => (
            <article key={template.name} className="template-card">
              <div className="template-meta">
                <span className="badge badge-neutral">{template.category}</span>
              </div>
              <h3>{template.name}</h3>
              <p>{template.summary}</p>
              <div className="template-tags">
                {template.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
