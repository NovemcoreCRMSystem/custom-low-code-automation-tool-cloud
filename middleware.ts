import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { getSupabaseConfig } from './src/lib/supabase/config';

export async function middleware(request: NextRequest) {
  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.next();
  }

  const cookiesToSet: Array<{ name: string; value: string; options?: any }> = [];

  const supabase = createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookies) {
        cookiesToSet.push(...cookies);
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/settings');
  const isAuthRoute = pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup');

  let response = NextResponse.next({ request });

  if (isProtectedRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/auth/login';
    loginUrl.searchParams.set('next', pathname);
    response = NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    dashboardUrl.search = '';
    response = NextResponse.redirect(dashboardUrl);
  }

  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options);
  });

  return response;
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/settings', '/settings/:path*', '/auth/login', '/auth/signup'],
};
