import { type NextRequest, NextResponse } from 'next/server';

import { postGuestLoginServer } from './app/login/_apis/postGuestLogin';
import { ROUTES } from './consts/route';

const PUBLIC_ROUTES = ['/home', '/login', '/tournament/join'] as const;
const MEMBER_ROUTES = ['/archive'] as const;

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  /** 멤버 및 게스트 공통 영역: access_token 없으면 게스트 로그인 후 진입 */
  if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route))) {
    const hasAuthToken = request.cookies.get('access_token');

    if (!hasAuthToken) {
      const response = await postGuestLoginServer();
      const nextResponse = NextResponse.next();

      const setCookieHeader = response.headers['set-cookie'];
      setCookieHeader?.forEach(cookie => nextResponse.headers.append('set-cookie', cookie));

      return nextResponse;
    }

    return NextResponse.next();
  }

  /** 멤버 영역: access_token 없으면 로그인으로 이동 (멤버 여부는 서버 레이아웃에서 API로 검증) */
  if (MEMBER_ROUTES.some(route => pathname === route || pathname.startsWith(route))) {
    const hasAuthToken = request.cookies.get('access_token');

    if (!hasAuthToken) {
      const loginUrl = new URL(ROUTES.LOGIN, request.url);
      loginUrl.searchParams.set('callback', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-callback', pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/home', '/login', '/tournament/join/:path*', '/archive/:path*'],
};
