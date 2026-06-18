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

  const cookieMap = new Map(
    request.cookies.getAll().map(cookie => [cookie.name, cookie.value] as const)
  );

  try {
    /**
     * 토큰 갱신 요청
     * - 쿠키 옵션 제거 후 key, value만 추출하여 페이지로 전달
     */
    const response = await postTokenRefreshServer(
      [...cookieMap.entries()].map(([name, value]) => `${name}=${value}`).join('; ')
    );

    /**
     * 페이지 요청에서는 쿠키 옵션을 필요로 하지 않음
     * 쿠키 옵션 제거 후 key, value만 추출하여 페이지로 전달
     */
    const setCookieHeaders = response.headers['set-cookie'] ?? [];
    setCookieHeaders.forEach(setCookie => {
      const nameValue = setCookie.split(';')[0] ?? '';
      const separatorIndex = nameValue.indexOf('=');
      if (separatorIndex === -1) return;

      const name = nameValue.slice(0, separatorIndex).trim();
      const value = nameValue.slice(separatorIndex + 1).trim();
      cookieMap.set(name, value);
    });

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
      'cookie',
      [...cookieMap.entries()].map(([name, value]) => `${name}=${value}`).join('; ')
    );

    if (getRouteType(pathname) === 'MEMBER_ONLY')
      requestHeaders.set('x-redirect-path', `${pathname}${search}`);

    /** 갱신된 쿠키 페이지 요청에 전달 */
    const nextResponse = NextResponse.next({ request: { headers: requestHeaders } });

    /** 서버에서 받아온 쿠키 브라우저에 저장 */
    setCookieHeaders.forEach(cookie => nextResponse.headers.append('set-cookie', cookie));

    return nextResponse;
  } catch {
    return NextResponse.redirect(new URL(getLoginPath(`${pathname}${search}`), request.url));
  }
};

export const proxy = async (request: NextRequest) => {
  /**
   * Apple OAuth 콜백은 form POST로 전송되며, 백엔드 설정에 따라 /home 등 다른 경로로 들어올 수 있다.
   * appleid.apple.com origin의 POST 요청을 /auth/callback/apple로 rewrite한다.
   */
  if (
    request.method === 'POST' &&
    request.headers.get('origin')?.includes('appleid.apple.com')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/callback/apple';
    return NextResponse.rewrite(url);
  }

  const { pathname, search } = request.nextUrl;

  const routeType = getRouteType(pathname);

  if (!routeType) return NextResponse.next();

  /** 퍼블릭 영역 */
  if (routeType === 'PUBLIC') return NextResponse.next();

  /** 멤버 및 게스트 공통 영역 */
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  if (routeType === 'MEMBER_AND_GUEST') {
    /** access(O): 통과 */
    if (accessToken && isTokenValid(accessToken.value)) return NextResponse.next();

    /** access(X), refresh(O): 토큰 갱신, 실패 시 로그인 페이지로 리다이렉트 */
    if (refreshToken) return await handleTokenRefresh(request);

    /** access(X), refresh(X): 자동 게스트 로그인 */
    return await handleGuestLogin();
  }

  if (routeType === 'MEMBER_ONLY' || routeType === 'AUTHORIZED') {
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
