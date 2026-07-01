# AI REVIEW REQUEST

Phase 2.5 auth smoke test summary:

- Local Supabase-aware smoke test completed with a temporary `.env.local`.
- Missing-env mock fallback was verified after removing the temp env file.
- Added `docs/SUPABASE_DEV_SETUP.md` for repeatable local setup.

Checklist:

- [x] App starts locally
- [x] Home page renders
- [x] Login page renders
- [x] Signup page renders
- [x] Dashboard route protection redirects when Supabase config is present
- [x] Settings route protection redirects when Supabase config is present
- [x] Mock mode works when Supabase env vars are missing
- [x] No `.env` or `.env.local` committed
- [x] `npm run typecheck`, `npm run build`, and `npm run lint` pass

Notes:

- Temporary `.env.local` was used only for the local smoke test and removed afterwards.
- The config helper can derive the project URL from the JWT-style public key pair during local testing when the supplied URL value is not a full `https://` URL.
