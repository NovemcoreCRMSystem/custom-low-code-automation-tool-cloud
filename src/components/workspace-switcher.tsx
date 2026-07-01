'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  AUTH_STORAGE_EVENT,
  readStoredAuthSnapshot,
  saveStoredAuthSnapshot,
  type AuthSnapshot,
} from '@/lib/auth/session';

type WorkspaceSwitcherProps = {
  initialSession: AuthSnapshot;
  compact?: boolean;
};

export function WorkspaceSwitcher({ initialSession, compact = false }: WorkspaceSwitcherProps) {
  const [session, setSession] = useState<AuthSnapshot>(initialSession);
  const isMockSession = initialSession.source === 'mock';

  useEffect(() => {
    if (!isMockSession) {
      return;
    }

    const syncFromStorage = () => {
      const stored = readStoredAuthSnapshot();
      if (stored) {
        setSession(stored);
      }
    };

    syncFromStorage();
    window.addEventListener(AUTH_STORAGE_EVENT, syncFromStorage);

    return () => window.removeEventListener(AUTH_STORAGE_EVENT, syncFromStorage);
  }, [isMockSession]);

  const activeWorkspace = useMemo(
    () => session.workspaces.find((workspace) => workspace.id === session.activeWorkspaceId) ?? session.workspaces[0],
    [session],
  );

  const handleChange = (workspaceId: string) => {
    const nextSession = { ...session, activeWorkspaceId: workspaceId };
    setSession(nextSession);
    saveStoredAuthSnapshot(nextSession);
  };

  return (
    <article className={`workspace-switcher${compact ? ' workspace-switcher-compact' : ''}`}>
      <div className="status-card-header">
        <div>
          <p className="card-kicker">Workspace</p>
          <h3>Preview picker</h3>
        </div>
        <span className="badge badge-neutral">Mock data</span>
      </div>

      <label className="field-label" htmlFor="workspace-switcher-select">
        Active workspace
      </label>
      <select
        id="workspace-switcher-select"
        className="field-input"
        value={activeWorkspace?.id ?? ''}
        onChange={(event) => handleChange(event.target.value)}
      >
        {session.workspaces.map((workspace) => (
          <option key={workspace.id} value={workspace.id}>
            {workspace.name}
          </option>
        ))}
      </select>

      <p className="status-note">
        {activeWorkspace?.description ?? 'This selector only changes the local preview session for now.'}
      </p>

      <div className="status-card-actions">
        <span className="chip">Role: {activeWorkspace?.role ?? 'Viewer'}</span>
        <span className="chip">Preview only</span>
      </div>
    </article>
  );
}
