import Link from 'next/link';
import type { ReactNode } from 'react';

import { AuthStatusCard } from '@/components/auth-status-card';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';
import { getInitialAuthSnapshot } from '@/lib/auth/session';
import { navigation } from '@/lib/mock-data';

type AppShellProps = {
  title: string;
  description: string;
  activePath: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function AppShell({ title, description, activePath, children, actions }: AppShellProps) {
  const session = getInitialAuthSnapshot();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <p className="eyebrow">Novemcore</p>
          <h1>AI Automation SaaS</h1>
          <p>Clean workspace wrapper with draft-only AI safety.</p>
        </div>

        <nav aria-label="Primary" className="sidebar-nav">
          {navigation.map((item) => {
            const active = item.href === activePath;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${active ? ' nav-link-active' : ''}`}
              >
                <span>{item.label}</span>
                <small>{item.description}</small>
              </Link>
            );
          })}
        </nav>

        <AuthStatusCard initialSession={session} compact />

        <WorkspaceSwitcher initialSession={session} compact />

        <div className="sidebar-note">
          <p className="sidebar-note-title">Safe by design</p>
          <ul>
            <li>Drafts only until user approval</li>
            <li>No production integrations yet</li>
            <li>Wrapper-first architecture</li>
            <li>
              <Link href="/auth/login">Open auth flow</Link>
            </li>
          </ul>
        </div>
      </aside>

      <main className="app-main">
        <header className="app-header">
          <div>
            <p className="eyebrow">Workspace</p>
            <h2>{title}</h2>
            <p className="page-description">{description}</p>
          </div>
          {actions ? <div className="page-actions">{actions}</div> : null}
        </header>

        {children}
      </main>
    </div>
  );
}
