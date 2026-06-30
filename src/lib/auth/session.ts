import { isSupabaseConfigured, getSupabaseModeLabel } from '@/lib/supabase/config';

import { createPreviewSession, mockSession, type AuthSnapshot } from './mock-session';

export type { AuthSnapshot } from './mock-session';

export const AUTH_STORAGE_KEY = 'novemcore.auth.preview';
export const AUTH_STORAGE_EVENT = 'novemcore.auth.preview.changed';

export function getInitialAuthSnapshot(): AuthSnapshot {
  if (!isSupabaseConfigured()) {
    return mockSession;
  }

  return {
    ...mockSession,
    source: 'supabase-ready',
    modeLabel: getSupabaseModeLabel(),
    note: 'Supabase env vars are present. Real auth can be enabled in the next step.',
  };
}

export function readStoredAuthSnapshot(): AuthSnapshot | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as AuthSnapshot;
  } catch {
    return null;
  }
}

export function saveStoredAuthSnapshot(snapshot: AuthSnapshot): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(snapshot));
  window.dispatchEvent(new Event(AUTH_STORAGE_EVENT));
}

export function clearStoredAuthSnapshot(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_STORAGE_EVENT));
}

export function resolveAuthSnapshot(initial: AuthSnapshot): AuthSnapshot {
  return readStoredAuthSnapshot() ?? initial;
}

export function createSessionPreviewFromForm(input: {
  name?: string;
  email?: string;
  organizationName?: string;
  workspaceName?: string;
  workspaceDescription?: string;
  source?: AuthSnapshot['source'];
  note?: string;
}): AuthSnapshot {
  return createPreviewSession(input);
}
