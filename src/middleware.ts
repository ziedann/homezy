import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const allowedRoutes = [
    '/',
    '/search-property',
    '/property',
    '/post-property',
    '/sign-in',
    '/sign-up',
    '/404',
    '/api',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.json',
    '/_next',
    '/logo-icon.svg'
  ];
  
  const isAllowedRoute = allowedRoutes.some(route => {
    if (route === '/property') {
      return pathname.startsWith('/property/') || pathname === '/property';
    }
    if (route === '/api') {
      return pathname.startsWith('/api');
    }
    if (route === '/_next') {
      return pathname.startsWith('/_next');
    }
    return pathname === route;
  });
  
  if (!isAllowedRoute) {
    return NextResponse.redirect(new URL('#', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
