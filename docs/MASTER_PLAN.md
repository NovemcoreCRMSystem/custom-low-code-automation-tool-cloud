# MASTER PLAN — Novemcore AI Automation SaaS

Source: user-provided project plan, expanded with later decisions about Codex, opencode-conductor, repository setup, and safe parallel implementation.

Last updated: 2026-06-30

---

You are my senior SaaS architect, full-stack developer, automation engineer, and implementation mentor.

I am a non-coder / non-technical person. I want to build a SaaS product under the Novemcore brand using an open-source low-code automation tool, most likely Activepieces Community Edition, as the automation engine.

My idea:

* Novemcore will be the main SaaS wrapper.
* Users will log into a Novemcore dashboard.
* Normal users should see a simple interface with templates, automation categories, logs, settings, usage, and connected apps.
* Power users should have an “Advanced Builder” button.
* The Advanced Builder should open a rebranded/customized Activepieces builder.
* I want an AI workflow generator: the user gives a plain-language prompt, and the system creates a draft workflow automatically.
* Example user prompt: “When I add a new Apollo lead, enrich it with AI, write a personalized email, send it through Brevo, and save the result in Supabase.”
* The AI should not directly publish risky automations. It should create a draft workflow, show missing connections/settings, validate the workflow, and let the user test/publish manually.
* I want to use Opencode Go to build this system.
* I also want to use Opencode API for automation tasks if possible.
* If Opencode Go/API is not suitable for runtime automation inside my SaaS, explain that clearly and recommend the correct alternative.
* Activepieces should remain updateable over time. I do not want a fork that becomes impossible to update.
* Customization/rebranding should be possible, but without destroying the ability to merge future Activepieces updates.

Tools/subscriptions I have, but not all are mandatory:

* Vercel
* Supabase
* Sanity
* Apollo
* Namecheap
* Brevo
* Opencode Go
* Opencode API if usable
* AI APIs/models if needed

Important instruction:

Do not assume all these tools must be used. Decide which tools are actually necessary. For example, maybe only Vercel + Supabase + self-hosted Activepieces are enough for the MVP. Recommend the simplest realistic architecture.

Your task:

Create a comprehensive step-by-step implementation plan for this whole system.

The plan must be suitable for a non-coder. Explain simply, but still be technically correct.

The plan should include:

1. Product vision

Explain what the final SaaS should be, in simple business language.

Position it as:

“Novemcore AI Automation SaaS”

not as:

“a rebranded Activepieces clone.”

2. Recommended MVP

Define the smallest useful first version.

Tell me what to build first and what to postpone.

The MVP should avoid overengineering.

3. Tool selection

For each tool I mentioned, explain:

* use now
* use later
* optional
* not needed
* why

Include a clear table.

Tools to evaluate:

* Vercel
* Supabase
* Sanity
* Apollo
* Namecheap
* Brevo
* Opencode Go
* Opencode API
* Activepieces
* AI API/model provider

4. Architecture

Design the technical architecture in simple terms.

Include:

* frontend
* backend
* database
* authentication
* tenant/workspace handling
* Activepieces hosting
* AI workflow generator
* automation execution
* logs
* secrets/API keys
* usage tracking
* billing later

Use simple text diagrams.

5. Activepieces strategy

Explain the best way to use Activepieces.

Cover:

* cloud vs self-hosted
* Community Edition vs paid/enterprise features
* how to avoid license/white-label problems
* how to keep Activepieces updateable
* how to rebrand safely
* what customization should happen in the Novemcore wrapper
* what customization can safely happen inside Activepieces
* what files/folders should not be deeply modified
* how to track upstream updates from Activepieces GitHub
* how to update Activepieces over time without breaking my SaaS

Give a clear “do this / avoid this” checklist.

6. Opencode API role

Explain whether and how Opencode API can be used in this system.

Separate two possible meanings:

A. Using Opencode Go as my development/coding assistant to build the SaaS.

B. Using Opencode API as part of the live SaaS automation system for end users.

For each one, explain:

* is it possible?
* is it recommended?
* what are the risks?
* what should be used instead if it is not suitable?
* how to keep API keys safe?
* how to avoid depending on the wrong API for production automation?

If Opencode API is useful, propose exact use cases.

If it is not ideal for live SaaS workflow execution, recommend using Activepieces API/MCP + AI provider API instead.

7. AI workflow generator

Design how the prompt-to-workflow feature should work.

Include:

* user prompt input
* AI intent detection
* template matching
* workflow draft generation
* missing connection detection
* validation
* test run
* manual approval
* publish

Important:

* AI must create drafts only.
* AI should not publish workflows automatically.
* AI should not directly send emails or modify customer data without approval.
* The system must show what it plans to do before activation.

Explain whether this should use:

* Activepieces API
* Activepieces MCP tools
* generated JSON
* workflow templates
* or another safer method

Avoid direct database writes into Activepieces unless absolutely necessary.

8. Multi-tenancy

Explain how to support multiple customers/clients.

Include:

* users
* organizations
* workspaces
* roles
* separating customer data
* separating credentials
* limiting access to workflows
* logs per customer
* usage per customer

9. Security and compliance basics

Explain in beginner-friendly terms:

* where API keys should be stored
* what should never be exposed to the browser
* how to handle customer credentials
* rate limits
* logging
* backups
* GDPR/basic EU/Germany data protection considerations
* email sending safety
* AI cost control

10. Deployment plan

Give a realistic deployment strategy.

Include:

* local development setup
* staging environment
* production environment
* Docker requirement for Activepieces
* VPS/server options
* Vercel role
* Supabase role
* Namecheap domain setup
* SSL/HTTPS
* environment variables
* backup plan
* update process

11. Database plan

If Supabase is recommended, propose the main tables needed for the Novemcore wrapper.

Keep it simple.

Example tables:

* profiles
* organizations
* organization_members
* workspaces
* automation_templates
* generated_workflows
* workflow_runs
* connected_apps
* credentials_metadata
* usage_logs
* audit_logs
* billing_plans later

For each table, explain its purpose in simple language.

12. Rebranding/customization plan

Explain how to customize the system while keeping updates possible.

Include:

* Novemcore wrapper branding
* Activepieces light rebrand
* custom domain/subdomain
* logo/colors
* navigation
* login page
* email templates
* what not to deeply change in the beginning
* how to document all customization changes

13. Parallel implementation plan

Very important:

Divide the implementation into 2 or 3 parallel workstreams that can be run in different Opencode sessions to save time.

For each workstream, define:

* goal
* exact responsibility
* files/folders it may modify
* files/folders it must not modify
* dependencies on other workstreams
* deliverables
* testing checklist
* handoff notes

Suggested structure:

Workstream A: Novemcore Wrapper SaaS

* Vercel app
* Supabase auth
* dashboard
* user/organization/workspace structure
* templates page
* logs page
* settings page

Workstream B: Activepieces Hosting + Integration

* self-host Activepieces
* Docker setup
* environment variables
* domain/subdomain
* API/MCP access
* light rebranding strategy
* update process
* connection between Novemcore wrapper and Activepieces

Workstream C: AI Workflow Generator

* prompt UI
* intent detection
* template matching
* workflow draft JSON
* validation
* missing setup checklist
* draft creation in Activepieces
* safety rules
* approval flow

If only 2 sessions are better, combine B and C or recommend the best 2-session split.

Also define sync points where the sessions must stop and compare progress before continuing.

14. Step-by-step implementation roadmap

Break the project into phases.

For each phase include:

* objective
* exact tasks
* which workstream/session does it
* expected output
* test instructions
* risk
* “do not continue until this works” checkpoint

Use phases like:

Phase 0: Planning and repository setup
Phase 1: Supabase + Vercel wrapper skeleton
Phase 2: Activepieces local/self-hosted setup
Phase 3: Basic connection between wrapper and Activepieces
Phase 4: Automation templates
Phase 5: AI workflow generator draft mode
Phase 6: Advanced Builder button
Phase 7: Rebranding
Phase 8: Usage logs and safety controls
Phase 9: Staging deployment
Phase 10: First client pilot
Phase 11: Production hardening

15. Non-coder execution instructions

Because I am non-technical, explain how I should work with Opencode Go.

Give me:

* how to start each session
* what initial prompt to give each session
* what to ask before allowing code changes
* how to make Opencode inspect the project first
* how to ask for a file tree before edits
* how to prevent sessions from overwriting each other
* how to test after each change
* how to commit to GitHub
* how to write handoff notes between sessions
* how to maintain PROJECT_CONTEXT.md, DECISIONS.md, TODO.md, HANDOFF.md, and CHANGELOG.md

16. Prompt pack for Opencode sessions

Generate ready-to-copy prompts for:

* Session A: Novemcore Wrapper SaaS
* Session B: Activepieces Hosting/Integration
* Session C: AI Workflow Generator
* Integration Session: merge/check all workstreams
* Debug Session: when something breaks
* Update Session: when Activepieces upstream has updates

Each prompt should tell Opencode exactly what to do and what not to touch.

17. Cost estimate

Give rough monthly cost ranges for:

* local testing
* MVP
* first client pilot
* production SaaS

Separate mandatory costs from optional costs.

18. Risk list

List major risks, such as:

* Activepieces license/white-label limitations
* update conflicts after rebranding
* AI generating wrong workflows
* Opencode API not being suitable for production automation
* API key/security problems
* multi-tenant data leakage
* email sending abuse
* AI/API cost spikes
* non-technical maintenance difficulty

For each risk, give mitigation.

19. Final recommendation

End with a clear recommendation:

* simplest architecture
* first MVP scope
* tools to use now
* tools to avoid for now
* whether to run 2 or 3 parallel sessions
* what to build first
* what not to build first

Output format:

Use clear headings, tables, numbered steps, and checklists.

Explain like I am a beginner.

Do not start coding yet.

First produce the full comprehensive plan.

After the plan, give me the exact step-by-step implementation checklist that I can follow with Opencode Go.
---

# Addendum A — Model and Provider Usage Strategy

You have two main AI development resources:

- **Opencode Go**: use for most planning, scaffolding, UI work, documentation, small implementation tasks, mock data, and repeated edits.
- **Codex plugin inside Opencode**: use as the senior reviewer and high-confidence agent for security, architecture, multi-tenant logic, difficult debugging, and final merge checks.

## Simple model rule

Use **Opencode Go for 70–80% of implementation** and **Codex for the risky 20–30%**.

Do not waste Codex on:

- simple documentation
- basic page creation
- mock data
- small UI copy changes
- repetitive boilerplate

Use Codex for:

- architecture review
- Supabase Row Level Security review
- secrets/API-key review
- Activepieces integration review
- AI workflow safety review
- multi-tenant isolation review
- Docker/production deployment review
- final code review before merging to `main`
- difficult debugging where cheaper models failed

## Recommended model routing

Before starting, run `/models` in Opencode and verify which models are available. Do not assume the model list is permanent.

| Task type | Recommended provider/model | Notes |
|---|---|---|
| Project planning | Opencode Go: GLM/Kimi/Qwen class model | Save Codex unless plan is critical |
| Basic UI/dashboard | Opencode Go | Good for repeated implementation |
| Documentation | Cheap Opencode Go model | Keep context light |
| Supabase schema draft | Opencode Go first, Codex review | Codex checks RLS/security |
| Supabase RLS/security | Codex | High-risk area |
| Activepieces Docker setup | Opencode Go draft, Codex review | Avoid production mistakes |
| Activepieces update strategy | Codex review | Important for long-term maintainability |
| AI workflow generator schema | Opencode Go GLM/Kimi, Codex review | Safety-critical |
| Prompt-to-workflow implementation | Opencode Go implementation, Codex review | Draft-only rule must be enforced |
| Debugging complex failures | Codex | Use after cheaper model attempt |
| Final merge review | Codex | Mandatory before production/staging merge |

# Addendum B — opencode-conductor Strategy

Use `opencode-conductor` as the project workflow manager inside OpenCode.

Its role is not to replace Opencode Go or Codex. Its role is to enforce the lifecycle:

```text
Context → Spec → Plan → Implement
```

This is important because the project is complex and you are non-technical. AI sessions must not randomly edit files.

## Use opencode-conductor for

- creating structured project context
- turning ideas into clear feature specs
- creating implementation plans before coding
- splitting work into safe tracks
- keeping each session focused
- improving handoff between parallel sessions
- documenting assumptions, risks, and decisions

## Do not use opencode-conductor for unrestricted autonomous coding

Conductor can implement small approved tasks, but risky changes must be reviewed by Codex before merge.

## Conductor rules

Before implementation, every conductor track must output:

1. feature goal
2. current file tree
3. proposed file tree
4. exact files it will edit
5. exact files it will not touch
6. assumptions
7. risks
8. rollback plan
9. test plan
10. handoff plan

No implementation should start until you approve this plan.

# Addendum C — Parallel Workstreams

Use three parallel workstreams only when file ownership is clear.

## Track A — Novemcore Wrapper SaaS

Owns:

- Vercel/Next.js app
- Supabase auth
- dashboard
- organizations/workspaces UI
- templates page
- logs page
- settings page

Must not touch:

- Activepieces source code
- Docker deployment files
- AI workflow generator internals

Recommended model:

- Opencode Go for implementation
- Codex for auth/security review

## Track B — Activepieces Hosting + Integration

Owns:

- Docker setup
- Activepieces self-hosting
- environment variables
- API/MCP access
- update strategy
- light rebranding documentation
- connection between Novemcore wrapper and Activepieces

Must not touch:

- main dashboard UI
- Supabase auth logic
- AI prompt-to-workflow logic except integration contracts

Recommended model:

- Opencode Go for setup/docs
- Codex for Docker/security/updateability review

## Track C — AI Workflow Generator

Owns:

- prompt input
- intent detection
- workflow draft JSON
- template matching
- missing fields checklist
- validation rules
- approval flow
- draft creation via Activepieces API/MCP

Must not touch:

- production deployment
- authentication core
- Activepieces source code
- real email sending without approval

Recommended model:

- Opencode Go for implementation
- Codex for safety and validation review

# Addendum D — Safety Rules

The AI workflow generator must only create draft workflows.

It must never automatically:

- publish workflows
- send emails
- delete data
- modify customer records
- trigger paid API calls
- expose API keys
- access another customer’s data

Manual approval is required before activation.

# Addendum E — Repository and Local Setup

Use this setup:

```text
GitHub repo: NovemcoreCRMSystem/custom-low-code-automation-tool-cloud
Local path: C:\Dev\custom-low-code-automation-tool-cloud
```

Recommended workflow:

1. GitHub is the source of truth.
2. Local folder is for active development.
3. Do not code inside OneDrive.
4. OneDrive can be used only for exported backups or documents.
5. Use branches for features.
6. Use Codex review before merging risky work.

# Addendum F — First Opencode Prompt

After these docs are committed, use this first prompt inside Opencode:

```text
Read docs/MASTER_PLAN.md, docs/PROJECT_CONTEXT.md, and docs/HANDOFF.md.

Do not code yet.

First summarize:
1. what this project is
2. the safest first implementation phase
3. the files you recommend creating next
4. the files you will not touch
5. risks
6. rollback plan

Wait for my approval before editing files.
```
