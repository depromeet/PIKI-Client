import { type NextRequest, NextResponse } from 'next/server';

import { postGuestLoginServer } from './app/login/_apis/postGuestLogin';
import { ROUTES } from './consts/route';

const PUBLIC_ROUTES = ['/home', '/login', '/tournament/join'] as const;
const MEMBER_ROUTES = ['/archive'] as const;

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

      nextResponse.cookies.set('user_role', response.data.data.user.identityType, {
        path: '/',
        maxAge: 60 * 60 * 24 * 14, // 14일
      });
    }
    /** 멤버 영역 진입 시 멤버 권한이 없으면 로그인 페이지로 리다이렉트 */
  } else if (MEMBER_ROUTES.some(route => pathname === route || pathname.startsWith(route))) {
    const hasAuthToken = request.cookies.get('access_token');
    const userRole = request.cookies.get('user_role')?.value;

    if (!hasAuthToken || userRole !== 'MEMBER') {
      const loginUrl = new URL(ROUTES.LOGIN, request.url);
      loginUrl.searchParams.set('callback', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return nextResponse;
};

export const config = {
  matcher: ['/home', '/login', '/tournament/join/:path*', '/archive/:path*'],
};
