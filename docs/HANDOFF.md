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

The intended starter docs are:

```text
docs/PROJECT_CONTEXT.md
docs/HANDOFF.md
docs/NEXT_ACTION.md
docs/AI_REVIEW_REQUEST.md
docs/WORK_LOG.md
docs/MASTER_PLAN.md
README.md
```

No real implementation should exist yet.

## Reporting workflow

After every normal task, including when resuming an older session:

1. Overwrite `docs/AI_REVIEW_REQUEST.md` with a short review summary.
2. Append one dated line to `docs/WORK_LOG.md`.
3. Overwrite `docs/NEXT_ACTION.md` with the next recommended action.

These files are updated manually, not automatically.

Keep them short and do not create per-session report files.

## What the next Opencode session must do

Read:

```text
docs/PROJECT_CONTEXT.md
docs/HANDOFF.md
docs/NEXT_ACTION.md
```

Read `docs/MASTER_PLAN.md` only when starting a major new phase or when the task is unclear.

Follow `docs/NEXT_ACTION.md` for the active task.

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
