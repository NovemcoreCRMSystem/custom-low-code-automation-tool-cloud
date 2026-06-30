'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import {
  createSessionPreviewFromForm,
  saveStoredAuthSnapshot,
} from '@/lib/auth/session';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

type AuthFormMode = 'login' | 'signup';

type AuthFormProps = {
  mode: AuthFormMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const title = mode === 'login' ? 'Sign in' : 'Create account';
  const buttonLabel = mode === 'login' ? 'Continue to dashboard' : 'Create preview account';
  const canUseSupabase = isSupabaseConfigured();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const browserClient = getSupabaseBrowserClient();

      if (!browserClient || !canUseSupabase) {
        const previewSession = createSessionPreviewFromForm({
          name: name || undefined,
          email: email || undefined,
          organizationName: organizationName || undefined,
          workspaceName: workspaceName || undefined,
          workspaceDescription: workspaceDescription || undefined,
          source: 'mock',
          note: 'Mock mode is active because Supabase env vars are missing. This is a local preview only.',
        });

        saveStoredAuthSnapshot(previewSession);
        setMessage('Mock mode: preview session saved locally.');
        setDone(true);
        window.setTimeout(() => router.push('/dashboard'), 900);
        return;
      }

      if (mode === 'login') {
        const { error: signInError } = await browserClient.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          throw signInError;
        }

        saveStoredAuthSnapshot(
          createSessionPreviewFromForm({
            name: name || 'Signed-in user',
            email,
            organizationName: organizationName || 'Novemcore Labs',
            workspaceName: workspaceName || 'Growth Workspace',
            workspaceDescription: workspaceDescription || 'Lead enrichment and outbound drafts',
            source: 'supabase-ready',
            note: 'Supabase sign-in succeeded. Session persistence will be wired later.',
          }),
        );

        setMessage('Supabase sign-in succeeded. Preview session updated locally.');
        setDone(true);
        window.setTimeout(() => router.push('/dashboard'), 900);
        return;
      }

      const { error: signUpError } = await browserClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            organization_name: organizationName,
            workspace_name: workspaceName,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      saveStoredAuthSnapshot(
        createSessionPreviewFromForm({
          name: name || 'New user',
          email,
          organizationName: organizationName || 'New organization',
          workspaceName: workspaceName || 'New workspace',
          workspaceDescription: workspaceDescription || 'Preview workspace for the new account',
          source: 'supabase-ready',
          note: 'Supabase sign-up succeeded. Confirmation emails may still be required.',
        }),
      );

      setMessage('Supabase sign-up succeeded. Preview session updated locally.');
      setDone(true);
      window.setTimeout(() => router.push('/dashboard'), 900);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-header">
        <div>
          <p className="eyebrow">{canUseSupabase ? 'Supabase scaffold ready' : 'Mock mode'}</p>
          <h2>{title}</h2>
        </div>
        <span className={`badge ${canUseSupabase ? 'badge-success' : 'badge-warning'}`}>
          {canUseSupabase ? 'Config detected' : 'Preview only'}
        </span>
      </div>

      {!canUseSupabase ? (
        <p className="mock-banner">
          Supabase env vars are missing, so this form runs as a local preview. It will not crash or require a real
          backend.
        </p>
      ) : (
        <p className="mock-banner">
          Supabase env vars are present. Real auth calls are available, but session persistence is still scaffold-only.
        </p>
      )}

      <div className="field-grid">
        {mode === 'signup' ? (
          <label className="field">
            <span className="field-label">Full name</span>
            <input className="field-input" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
        ) : null}

        {mode === 'signup' ? (
          <label className="field">
            <span className="field-label">Organization</span>
            <input
              className="field-input"
              value={organizationName}
              onChange={(event) => setOrganizationName(event.target.value)}
            />
          </label>
        ) : null}

        {mode === 'signup' ? (
          <label className="field">
            <span className="field-label">Workspace</span>
            <input
              className="field-input"
              value={workspaceName}
              onChange={(event) => setWorkspaceName(event.target.value)}
            />
          </label>
        ) : null}

        {mode === 'signup' ? (
          <label className="field field-span-2">
            <span className="field-label">Workspace description</span>
            <input
              className="field-input"
              value={workspaceDescription}
              onChange={(event) => setWorkspaceDescription(event.target.value)}
              placeholder="Lead enrichment, reporting, or client preview"
            />
          </label>
        ) : null}

        <label className="field field-span-2">
          <span className="field-label">Email</span>
          <input
            className="field-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
          />
        </label>

        <label className="field field-span-2">
          <span className="field-label">Password</span>
          <input
            className="field-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
          />
        </label>
      </div>

      <div className="auth-actions">
        <button type="submit" className="button button-primary" disabled={loading}>
          {loading ? 'Working...' : buttonLabel}
        </button>

        {done ? (
          <Link href="/dashboard" className="button button-secondary">
            Open dashboard
          </Link>
        ) : (
          <Link href={mode === 'login' ? '/auth/signup' : '/auth/login'} className="button button-secondary">
            {mode === 'login' ? 'Need an account?' : 'Already have an account?'}
          </Link>
        )}
      </div>

      {message ? <p className="auth-message auth-message-success">{message}</p> : null}
      {error ? <p className="auth-message auth-message-error">{error}</p> : null}
    </form>
  );
}
