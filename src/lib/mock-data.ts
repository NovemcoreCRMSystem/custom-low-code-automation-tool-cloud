export type NavigationItem = {
  label: string;
  href: string;
  description: string;
};

export type StatCard = {
  label: string;
  value: string;
  detail: string;
};

export type WorkflowTemplate = {
  name: string;
  category: string;
  summary: string;
  tags: string[];
  steps: string[];
};

export type ActivityItem = {
  name: string;
  status: 'Healthy' | 'Draft' | 'Needs review' | 'Paused';
  timestamp: string;
  detail: string;
};

export type ConnectedApp = {
  name: string;
  status: 'Connected' | 'Pending' | 'Offline';
  purpose: string;
};

export type SettingsSection = {
  title: string;
  description: string;
  items: string[];
};

export const navigation: NavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Workspace overview and health',
  },
  {
    label: 'Templates',
    href: '/templates',
    description: 'Starter workflows and categories',
  },
  {
    label: 'Logs',
    href: '/logs',
    description: 'Recent runs and audit trail',
  },
  {
    label: 'Settings',
    href: '/settings',
    description: 'Workspace, security, and usage',
  },
];

export const dashboardStats: StatCard[] = [
  { label: 'Draft workflows', value: '18', detail: '6 ready for approval' },
  { label: 'Connected apps', value: '12', detail: '2 waiting on auth' },
  { label: 'Runs this week', value: '1,284', detail: '98.8% succeeded' },
  { label: 'Safety checks', value: '100%', detail: 'Draft-only guard active' },
];

export const recentRuns: ActivityItem[] = [
  {
    name: 'Apollo lead enrichment',
    status: 'Healthy',
    timestamp: '2 min ago',
    detail: 'Lead data enriched and queued for review.',
  },
  {
    name: 'Brevo email draft',
    status: 'Draft',
    timestamp: '18 min ago',
    detail: 'Copy generated, publish blocked until approval.',
  },
  {
    name: 'Supabase sync',
    status: 'Needs review',
    timestamp: '1 hr ago',
    detail: 'Missing table mapping detected in the draft.',
  },
  {
    name: 'Daily alert digest',
    status: 'Paused',
    timestamp: 'Yesterday',
    detail: 'Paused by workspace admin during review.',
  },
];

export const workflowTemplates: WorkflowTemplate[] = [
  {
    name: 'Lead enrichment to email draft',
    category: 'Sales',
    summary: 'Turn new leads into personalized outreach drafts.',
    tags: ['Apollo', 'AI', 'Brevo'],
    steps: ['Capture new lead', 'Enrich with AI', 'Create email draft', 'Approve before send'],
  },
  {
    name: 'Support ticket triage',
    category: 'Support',
    summary: 'Route incoming tickets and prepare replies.',
    tags: ['Zendesk', 'Slack', 'AI'],
    steps: ['New ticket', 'Classify intent', 'Route to queue', 'Prepare reply'],
  },
  {
    name: 'Weekly CRM summary',
    category: 'Operations',
    summary: 'Compile workspace activity into a simple report.',
    tags: ['Reports', 'Supabase', 'Email'],
    steps: ['Collect metrics', 'Summarize trends', 'Review digest', 'Share report'],
  },
  {
    name: 'Invoice follow-up reminder',
    category: 'Finance',
    summary: 'Draft reminders for overdue invoices.',
    tags: ['Billing', 'AI', 'Review'],
    steps: ['Check overdue list', 'Draft reminder', 'Verify details', 'Approve send'],
  },
];

export const connectedApps: ConnectedApp[] = [
  { name: 'Apollo', status: 'Connected', purpose: 'Lead enrichment and prospect sync' },
  { name: 'Brevo', status: 'Connected', purpose: 'Email draft preparation' },
  { name: 'Supabase', status: 'Pending', purpose: 'Workspace data and audit storage' },
  { name: 'Slack', status: 'Offline', purpose: 'Team notifications' },
];

export const settingsSections: SettingsSection[] = [
  {
    title: 'Workspace profile',
    description: 'Branding and basic workspace identity for Novemcore.',
    items: ['Workspace name: Novemcore', 'Default timezone: Europe/Berlin', 'Theme: Dark premium'],
  },
  {
    title: 'Safety controls',
    description: 'Draft-only approval flow and execution guardrails.',
    items: ['Manual approval required', 'Sensitive actions blocked', 'Audit trail enabled'],
  },
  {
    title: 'Notifications',
    description: 'Mock notification preferences for future implementation.',
    items: ['Approval alerts: On', 'Failure alerts: On', 'Weekly summary: Off'],
  },
  {
    title: 'Usage and billing',
    description: 'Simple usage snapshot for the planning phase.',
    items: ['Monthly runs: 1,284', 'AI draft requests: 44', 'Billing: Not connected yet'],
  },
];
