import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define allowed routes
  const allowedRoutes = [
    '/',
    '/search-property',
    '/property',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/404',
    '/api',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.json',
    '/_next',
    '/logo-icon.svg'
  ];
  
  // Check if the pathname starts with any allowed route
  const isAllowedRoute = allowedRoutes.some(route => {
    if (route === '/property') {
      // Allow /property/[slug] pattern
      return pathname.startsWith('/property/') || pathname === '/property';
    }
    if (route === '/api') {
      // Allow all API routes
      return pathname.startsWith('/api');
    }
    if (route === '/_next') {
      // Allow Next.js internal routes
      return pathname.startsWith('/_next');
    }
    return pathname === route;
  });
  
  // If route is not allowed, redirect to #
  if (!isAllowedRoute) {
    return NextResponse.redirect(new URL('#', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
