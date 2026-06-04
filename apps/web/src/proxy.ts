import { type NextRequest, NextResponse } from 'next/server';

import { postGuestLoginServer } from './app/login/_apis/postGuestLogin';

const PUBLIC_ROUTES = ['/home', '/login', '/tournament/join'] as const;

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const nextResponse = NextResponse.next();

  /** 멤버 및 게스트 공통 영역 진입 시 access_token이 없으면 게스트 로그인 후 진입 */
  if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route))) {
    const hasAuthToken = request.cookies.get('access_token');

    if (!hasAuthToken) {
      const response = await postGuestLoginServer();

      const setCookieHeader = response.headers['set-cookie'];
      setCookieHeader?.forEach(cookie => nextResponse.headers.append('set-cookie', cookie));
    }
  }

  return nextResponse;
};

export const config = {
  matcher: ['/home', '/login', '/tournament/join/:path*'],
};
