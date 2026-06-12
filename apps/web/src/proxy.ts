import { type NextRequest, NextResponse } from 'next/server';

import { postTokenRefreshServer } from './apis/postTokenRefresh';
import { postGuestLoginServer } from './app/login/_apis/postGuestLogin';
import { isTokenValid } from './utils/auth';
import { getRouteType } from './utils/getRouteType';
import { getLoginPath } from './utils/loginRedirect';

const handleGuestLogin = async () => {
  const response = await postGuestLoginServer();
  const nextResponse = NextResponse.next();

  const setCookieHeader = response.headers['set-cookie'];
  setCookieHeader?.forEach(cookie => nextResponse.headers.append('set-cookie', cookie));

  return nextResponse;
};

const handleTokenRefresh = async (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;

  try {
    const response = await postTokenRefreshServer();

    const requestHeaders = new Headers(request.headers);
    if (getRouteType(pathname) === 'MEMBER_ONLY')
      requestHeaders.set('x-redirect-path', `${pathname}${search}`);

    const nextResponse = NextResponse.next({ request: { headers: requestHeaders } });

    const setCookieHeader = response.headers['set-cookie'];
    setCookieHeader?.forEach(cookie => nextResponse.headers.append('set-cookie', cookie));

    return nextResponse;
  } catch {
    return NextResponse.redirect(new URL(getLoginPath(`${pathname}${search}`), request.url));
  }
};

export const proxy = async (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;

  const routeType = getRouteType(pathname);

  if (!routeType) return NextResponse.next();

  /** 퍼블릭 영역 */
  if (routeType === 'PUBLIC') return NextResponse.next();

  /** 멤버 및 게스트 공통 영역 */
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');
  if (routeType === 'MEMBER_AND_GUEST' || routeType === 'AUTHORIZED') {
    /** access(O): 통과 */
    if (accessToken && isTokenValid(accessToken.value)) return NextResponse.next();

    /** access(X), refresh(O): 토큰 갱신, 실패 시 로그인 페이지로 리다이렉트 */
    if (refreshToken) return await handleTokenRefresh(request);

    /** access(X), refresh(X): 자동 게스트 로그인 */
    return await handleGuestLogin();
  }

  if (routeType === 'MEMBER_ONLY') {
    /** access(O): 통과, 헤더에 쿼리파라미터까지 포함된 이동 경로 주입 */
    if (accessToken && isTokenValid(accessToken.value)) {
      const headers = new Headers(request.headers);
      headers.set('x-redirect-path', `${pathname}${search}`);
      return NextResponse.next({ request: { headers } });
    }

    /** access(X), refresh(O): 토큰 갱신, 실패 시 로그인 페이지로 리다이렉트 */
    if (refreshToken) return await handleTokenRefresh(request);

    /** access(X), refresh(X): 로그인 페이지로 리다이렉트 */
    return NextResponse.redirect(new URL(getLoginPath(`${pathname}${search}`), request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
