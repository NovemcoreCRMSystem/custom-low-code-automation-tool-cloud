# HANDOFF — Next Opencode Session

## Current status

Repository:

```text
NovemcoreCRMSystem/custom-low-code-automation-tool-cloud
```

Local path:

```text
C:\Dev\custom-low-code-automation-tool-cloud
```

The project is in planning/setup stage only.

The only intended initial files are:

```text
docs/MASTER_PLAN.md
docs/PROJECT_CONTEXT.md
docs/HANDOFF.md
README.md
```

No real implementation should exist yet.

## What the next Opencode session must do

Read:

```text
docs/MASTER_PLAN.md
docs/PROJECT_CONTEXT.md
docs/HANDOFF.md
```

Do not code yet.

First produce:

1. current file tree
2. understanding of the project
3. safest first implementation phase
4. exact files recommended for the next step
5. files that must not be touched
6. risks
7. rollback plan
8. test/check plan

Wait for explicit approval before editing files.

## First recommended implementation phase

The first real implementation phase should be:

```text
Phase 1 — Novemcore wrapper skeleton
```

This means:

- create a basic Vercel/Next.js app structure
- no real Supabase production keys
- no Activepieces source changes
- no AI workflow generator implementation yet
- no real Apollo/Brevo integrations

## Do not start with

Do not start with:

- full Activepieces rebranding
- production Docker deployment
- real email sending
- real Apollo integration
- billing
- complex multi-tenant automation execution
- autonomous AI workflow publishing

## Mandatory safety rules

Every session must first list:

- files it will edit
- files it will not touch
- assumptions
- risks
- rollback plan

No session should edit security-sensitive files or production configuration without Codex review.

## Model usage

Use Opencode Go for most implementation.

Use Codex for:

- security review
- Supabase Row Level Security review
- Activepieces integration review
- multi-tenant isolation review
- AI workflow safety review
- difficult debugging
- final merge review

## Parallel tracks for later

After the starter docs are committed, create these tracks with opencode-conductor:

1. Track A — Novemcore Wrapper SaaS
2. Track B — Activepieces Hosting + Integration
3. Track C — AI Workflow Generator

Each track must have clear file ownership.
