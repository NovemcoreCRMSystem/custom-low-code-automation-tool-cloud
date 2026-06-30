# PROJECT CONTEXT — Novemcore AI Automation SaaS

## Project

Build a SaaS product under the Novemcore brand using an open-source low-code automation engine, most likely Activepieces Community Edition.

The product should be positioned as:

```text
Novemcore AI Automation SaaS
```

not as:

```text
A rebranded Activepieces clone
```

## Core idea

Novemcore is the user-facing SaaS wrapper. Activepieces is the automation engine behind or inside the product.

Normal users should see a simple Novemcore dashboard with:

- automation templates
- automation categories
- logs
- settings
- usage
- connected apps
- AI workflow creation

Power users can use an **Advanced Builder** button that opens a lightly rebranded/customized Activepieces builder.

## AI workflow generator

The user should be able to write a natural-language prompt such as:

```text
When I add a new Apollo lead, enrich it with AI, write a personalized email, send it through Brevo, and save the result in Supabase.
```

The system should then create a draft workflow.

## Critical safety rules

The AI workflow generator must only create draft workflows.

It must not automatically:

- publish workflows
- send emails
- delete data
- modify customer records
- trigger paid API calls
- expose API keys
- access another customer’s data

Manual user approval is required before activation.

## Tools and subscriptions

Available tools/subscriptions:

- Vercel
- Supabase
- Sanity
- Apollo
- Namecheap
- Brevo
- Opencode Go
- Codex plugin inside Opencode
- Opencode API if useful
- AI APIs/models if needed
- Activepieces Community Edition

Not all tools must be used. The MVP should stay simple.

## Preferred MVP stack

Likely MVP stack:

- Vercel / Next.js for the Novemcore wrapper
- Supabase for auth, database, organizations, workspaces, logs
- Self-hosted Activepieces for automation engine
- AI provider API for prompt-to-workflow generation
- Activepieces API/MCP for draft workflow creation and validation

Use Sanity, Apollo, Brevo, and billing later unless required for a specific demo.

## Development approach

Use:

- Opencode Go for most implementation
- Codex for security, review, difficult debugging, and final merge checks
- opencode-conductor for Context → Spec → Plan → Implement workflow

## Repository

GitHub repo:

```text
NovemcoreCRMSystem/custom-low-code-automation-tool-cloud
```

Local path:

```text
C:\Dev\custom-low-code-automation-tool-cloud
```

Do not work inside OneDrive.

## Current status

- Repository created.
- Local folder created.
- Initial docs are being prepared manually.
- No SaaS app should exist yet.
- No Supabase schema should exist yet.
- No Activepieces setup should exist yet.
- No real API keys should be committed.
