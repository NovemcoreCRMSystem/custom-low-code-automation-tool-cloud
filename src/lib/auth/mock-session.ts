export type AuthSource = 'mock' | 'supabase-ready';

export type MockProfile = {
  name: string;
  email: string;
  role: string;
};

export type MockOrganization = {
  id: string;
  name: string;
  plan: string;
};

export type MockWorkspace = {
  id: string;
  name: string;
  description: string;
  role: string;
};

export type AuthSnapshot = {
  source: AuthSource;
  modeLabel: string;
  note: string;
  signedIn: boolean;
  user: MockProfile;
  organization: MockOrganization;
  workspaces: MockWorkspace[];
  activeWorkspaceId: string;
};

export type MockSessionInput = {
  name?: string;
  email?: string;
  organizationName?: string;
  workspaceName?: string;
  workspaceDescription?: string;
  source?: AuthSource;
  note?: string;
  signedIn?: boolean;
};

export const mockWorkspaceOptions: MockWorkspace[] = [
  {
    id: 'workspace-growth',
    name: 'Growth Workspace',
    description: 'Lead enrichment and outbound drafts',
    role: 'Owner',
  },
  {
    id: 'workspace-ops',
    name: 'Ops Workspace',
    description: 'Internal automation and reporting',
    role: 'Editor',
  },
  {
    id: 'workspace-pilot',
    name: 'Pilot Workspace',
    description: 'Client preview and approval checks',
    role: 'Viewer',
  },
];

export const mockSession: AuthSnapshot = {
  source: 'mock',
  modeLabel: 'Mock mode',
  note: 'Local preview only. Supabase env vars are missing, so auth is simulated.',
  signedIn: true,
  user: {
    name: 'Sofia Novemcore',
    email: 'sofia@novemcore.example',
    role: 'Workspace owner',
  },
  organization: {
    id: 'org-novemcore',
    name: 'Novemcore Labs',
    plan: 'Planning',
  },
  workspaces: mockWorkspaceOptions,
  activeWorkspaceId: 'workspace-growth',
};

export function createPreviewSession(input: MockSessionInput = {}): AuthSnapshot {
  const signedIn = input.signedIn ?? true;
  const modeLabel =
    input.source === 'supabase-ready'
      ? signedIn
        ? 'Supabase session active'
        : 'Supabase session not found'
      : 'Mock mode';

  const workspaces = [
    {
      id: 'workspace-growth',
      name: input.workspaceName?.trim() || 'Growth Workspace',
      description: input.workspaceDescription?.trim() || 'Lead enrichment and outbound drafts',
      role: 'Owner',
    },
    mockWorkspaceOptions[1],
    mockWorkspaceOptions[2],
  ];

  return {
    source: input.source ?? 'mock',
    modeLabel,
    note:
      input.note ??
      (signedIn
        ? 'Mock session saved locally. Supabase env vars are optional for this scaffold and not required yet.'
        : 'No Supabase session found. Sign in to continue.'),
    signedIn,
    user: {
      name: input.name?.trim() || (signedIn ? 'Sofia Novemcore' : 'Signed-out visitor'),
      email: input.email?.trim() || (signedIn ? 'sofia@novemcore.example' : ''),
      role: signedIn ? 'Workspace owner' : 'Signed out',
    },
    organization: {
      id: 'org-novemcore',
      name: input.organizationName?.trim() || 'Novemcore Labs',
      plan: 'Planning',
    },
    workspaces,
    activeWorkspaceId: workspaces[0]?.id || 'workspace-growth',
  };
}

export function createSignedOutSession(input: MockSessionInput = {}): AuthSnapshot {
  return createPreviewSession({
    ...input,
    source: 'supabase-ready',
    signedIn: false,
    name: input.name ?? 'Signed-out visitor',
    email: input.email ?? '',
    note: input.note ?? 'No Supabase session found. Sign in to continue.',
  });
}
