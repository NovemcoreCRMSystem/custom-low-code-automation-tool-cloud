# Novemcore Custom Low-Code Automation Tool Cloud

This repository contains the planning and implementation for the **Novemcore AI Automation SaaS**.

The goal is to build a Novemcore-branded SaaS wrapper around an open-source low-code automation engine, most likely **Activepieces Community Edition**.

Novemcore should be the main user-facing SaaS product. Activepieces should be used as the automation engine behind the scenes.

## Current status

Phase 1 wrapper skeleton has been created.

Completed:

- Basic Next.js app shell
- Placeholder pages for dashboard, templates, logs, and settings
- Mock/static data only
- Typecheck passes
- Build passes
- Lint passes

Not started yet:

- Supabase authentication
- Supabase database schema
- Multi-tenant organization/workspace logic
- Activepieces self-hosting
- Activepieces API/MCP integration
- AI workflow generator
- Apollo, Brevo, Sanity, or billing integrations
- Production deployment

## Read first

Before making changes, read these files:

```text
docs/MASTER_PLAN.md
docs/PROJECT_CONTEXT.md
docs/HANDOFF.md