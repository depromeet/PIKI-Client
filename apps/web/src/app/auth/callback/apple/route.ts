import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const code = formData.get('code') as string | null;
  const state = formData.get('state') as string | null;

  const loginUrl = new URL('/login', request.url);

  if (!code || !state) {
    loginUrl.searchParams.set('appleError', 'missing_code_or_state');
    return NextResponse.redirect(loginUrl, { status: 302 });
  }

  const redirectUri = `${request.nextUrl.origin}/auth/callback/apple`;

  try {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/apple`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirectUri, state }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      loginUrl.searchParams.set('appleError', `backend_${apiResponse.status}`);
      loginUrl.searchParams.set('appleErrorBody', errorText);
      return NextResponse.redirect(loginUrl, { status: 302 });
    }

    const redirect = NextResponse.redirect(new URL('/home', request.url), { status: 302 });

    const cookies = apiResponse.headers.getSetCookie?.() ?? [];
    cookies.forEach(cookie => {
      /**
       * Apple OAuth는 cross-site 리다이렉트로 시작되므로 SameSite=Strict 쿠키가
       * 콜백 이후 첫 번째 same-domain 요청에 포함되지 않는다.
       * SameSite=Lax로 변경하면 top-level 리다이렉트 체인에서도 쿠키가 전송된다.
       */
      redirect.headers.append('set-cookie', cookie.replace(/SameSite=Strict/gi, 'SameSite=Lax'));
    });

    return redirect;
  } catch (e) {
    loginUrl.searchParams.set('appleError', `exception_${String(e)}`);
    return NextResponse.redirect(loginUrl, { status: 302 });
  }
}
