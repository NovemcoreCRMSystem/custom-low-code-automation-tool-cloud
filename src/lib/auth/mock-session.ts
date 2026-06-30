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
    modeLabel: input.source === 'supabase-ready' ? 'Supabase scaffold ready' : 'Mock mode',
    note:
      input.note ??
      'Mock session saved locally. Supabase env vars are optional for this scaffold and not required yet.',
    signedIn: true,
    user: {
      name: input.name?.trim() || 'Sofia Novemcore',
      email: input.email?.trim() || 'sofia@novemcore.example',
      role: 'Workspace owner',
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
