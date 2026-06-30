'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  AUTH_STORAGE_EVENT,
  clearStoredAuthSnapshot,
  readStoredAuthSnapshot,
  type AuthSnapshot,
} from '@/lib/auth/session';

type AuthStatusCardProps = {
  initialSession: AuthSnapshot;
  compact?: boolean;
};

export function AuthStatusCard({ initialSession, compact = false }: AuthStatusCardProps) {
  const [session, setSession] = useState<AuthSnapshot>(initialSession);

  useEffect(() => {
    const syncFromStorage = () => {
      const stored = readStoredAuthSnapshot();
      if (stored) {
        setSession(stored);
      }
    };

    syncFromStorage();
    window.addEventListener(AUTH_STORAGE_EVENT, syncFromStorage);

    return () => window.removeEventListener(AUTH_STORAGE_EVENT, syncFromStorage);
  }, []);

  const activeWorkspace = useMemo(
    () => session.workspaces.find((workspace) => workspace.id === session.activeWorkspaceId) ?? session.workspaces[0],
    [session],
  );

  const handleReset = () => {
    clearStoredAuthSnapshot();
    setSession(initialSession);
  };

  return (
    <article className={`status-card${compact ? ' status-card-compact' : ''}`}>
      <div className="status-card-header">
        <div>
          <p className="card-kicker">Auth profile</p>
          <h3>{session.modeLabel}</h3>
        </div>
        <span className={`badge ${session.source === 'mock' ? 'badge-warning' : 'badge-success'}`}>
          {session.source === 'mock' ? 'Mock only' : 'Supabase ready'}
        </span>
      </div>

      <div className="status-card-grid">
        <div>
          <p className="status-label">User</p>
          <strong>{session.user.name}</strong>
          <p>{session.user.email}</p>
        </div>

        <div>
          <p className="status-label">Organization</p>
          <strong>{session.organization.name}</strong>
          <p>{session.organization.plan} plan preview</p>
        </div>

        <div>
          <p className="status-label">Workspace</p>
          <strong>{activeWorkspace?.name ?? 'No workspace'}</strong>
          <p>{activeWorkspace?.description ?? 'Preview workspace'}</p>
        </div>
      </div>

      <p className="status-note">{session.note}</p>

      <div className="status-card-actions">
        <span className="chip">Signed in preview: {session.signedIn ? 'Yes' : 'No'}</span>
        <button type="button" className="button button-secondary button-small" onClick={handleReset}>
          Reset preview
        </button>
      </div>
    </article>
  );
}
