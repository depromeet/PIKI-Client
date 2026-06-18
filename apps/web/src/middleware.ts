import { type NextRequest, NextResponse } from 'next/server';

/**
 * Apple OAuth 콜백은 form POST로 전송되며, Apple Developer Portal에 등록된 redirect_uri로 들어온다.
 * 백엔드가 redirect_uri를 /home으로 설정하는 경우 POST /home이 발생하므로 올바른 핸들러로 rewrite한다.
 */
export function middleware(request: NextRequest) {
  const isAppleCallback =
    request.method === 'POST' &&
    request.headers.get('origin')?.includes('appleid.apple.com');

  if (isAppleCallback) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/callback/apple';
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*|auth/callback).*)'],
};
