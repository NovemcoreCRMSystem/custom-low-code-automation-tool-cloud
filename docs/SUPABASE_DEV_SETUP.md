# SUPABASE DEV SETUP

Local-only setup for Phase 2.5:

1. Create `.env.local` in the repo root.
2. Add only these variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Do not commit `.env.local`.
4. Run `npm run dev`.
5. Verify:
   - `/auth/login` renders the Supabase-aware auth UI
   - `/auth/signup` renders the Supabase-aware auth UI
   - `/dashboard` and `/settings` redirect to `/auth/login?next=...` when not signed in
   - mock mode appears again when both env vars are removed

Notes:

- If the first value is not a full `https://` URL, the app will try to infer the Supabase project URL from the public key pair during local testing.
