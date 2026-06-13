import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const code = formData.get('code') as string | null;
  const state = formData.get('state') as string | null;

  const loginUrl = new URL('/login', request.url);

  if (!code || !state) {
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
      return NextResponse.redirect(loginUrl, { status: 302 });
    }

    const redirect = NextResponse.redirect(new URL('/home', request.url));

    const cookies = apiResponse.headers.getSetCookie?.() ?? [];
    cookies.forEach(cookie => redirect.headers.append('set-cookie', cookie));

    return redirect;
  } catch {
    return NextResponse.redirect(loginUrl, { status: 302 });
  }
}
