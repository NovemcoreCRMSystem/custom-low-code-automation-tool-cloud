import { AppShell } from '@/components/app-shell';
import { workflowTemplates } from '@/lib/mock-data';

export default function TemplatesPage() {
  return (
    <AppShell
      title="Templates"
      description="Starter automations organized as simple, reviewable drafts."
      activePath="/templates"
      actions={<span className="button button-primary" aria-disabled="true">New draft template</span>}
    >
      <section className="template-grid">
        {workflowTemplates.map((template) => (
          <article key={template.name} className="template-card">
            <div className="template-meta">
              <span className="badge badge-neutral">{template.category}</span>
            </div>
            <div>
              <h3>{template.name}</h3>
              <p>{template.summary}</p>
            </div>

            <div className="template-tags">
              {template.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>

            <ol className="template-steps">
              {template.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
