import { redirect } from 'next/navigation';

import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getSupabaseConfig, type SupabaseConfig } from '@/lib/supabase/config';

import { createPreviewSession, createSignedOutSession, mockSession, type AuthSnapshot } from './mock-session';

type ServerAuthOptions = {
  redirectToLogin?: string;
  redirectIfAuthenticatedTo?: string;
  supabaseConfig?: SupabaseConfig | null;
};

function getString(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

export async function getServerAuthSnapshot(options: ServerAuthOptions = {}): Promise<AuthSnapshot> {
  const config = options.supabaseConfig ?? getSupabaseConfig();

  if (!config) {
    return mockSession;
  }

  const supabase = await getSupabaseServerClient(config);

  if (!supabase) {
    return mockSession;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    if (options.redirectToLogin) {
      redirect(options.redirectToLogin);
    }

    return createSignedOutSession();
  }

  if (options.redirectIfAuthenticatedTo) {
    redirect(options.redirectIfAuthenticatedTo);
  }

  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;

  return createPreviewSession({
    name: getString(metadata.full_name, getString(metadata.name, user.email ?? 'Signed-in user')),
    email: user.email ?? 'signed-in@novemcore.example',
    organizationName: getString(metadata.organization_name, 'Novemcore Labs'),
    workspaceName: getString(metadata.workspace_name, 'Growth Workspace'),
    workspaceDescription: getString(
      metadata.workspace_description,
      'Connected Supabase session with scaffolded workspace context',
    ),
    source: 'supabase-ready',
    note: 'Authenticated via Supabase. Organization and workspace remain scaffolded previews.',
  });
}
