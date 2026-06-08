import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.method === 'POST' && request.nextUrl.pathname === '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/callback/apple';
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: '/login',
};
