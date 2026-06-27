/**
 * Next.js Edge Middleware — Route Protection
 *
 * Runs before every request at the Edge (no Node.js APIs available).
 * Strategy:
 *   - Check for `refreshToken` HttpOnly cookie presence as a proxy for auth
 *   - Protected routes without cookie → redirect to /login?next=<path>
 *   - Auth pages with cookie present → redirect to /dashboard (already logged in)
 *   - Public routes → pass through
 *
 * Note: cookie PRESENCE is checked, not token validity.
 * Actual token verification happens client-side in AuthInitializer.
 * This prevents obvious unauthenticated access without requiring Edge crypto.
 */

import { NextResponse } from 'next/server'

/** Routes that require authentication */
const PROTECTED_PREFIXES = ['/dashboard', '/settings', '/bookmarks']

/** Auth routes — redirect away if already logged in */
const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password']

export function middleware(request) {
  const { pathname } = request.nextUrl
  const hasRefreshToken = request.cookies.has('refreshToken')

  // ── Protected routes: no cookie → redirect to login ───────────────────────
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  if (isProtected && !hasRefreshToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── Auth routes: has cookie → redirect to dashboard ───────────────────────
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))
  if (isAuthRoute && hasRefreshToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
