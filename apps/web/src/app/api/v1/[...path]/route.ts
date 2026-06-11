import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
}

async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = new URL(request.url);
  const backendUrl = `${API_URL}/api/v1/${path.join('/')}${url.search}`;

  const cookieStore = await cookies();
  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.set('Cookie', cookieStore.toString());
  forwardHeaders.delete('host');
  forwardHeaders.delete('transfer-encoding');
  forwardHeaders.delete('origin');
  forwardHeaders.delete('referer');

  // request.body(ReadableStream)를 직접 전달하면 undici가 "expected non-null body source" 에러를 던질 수 있음
  const isBodyMethod = !['GET', 'HEAD'].includes(request.method);
  let body: ArrayBuffer | null = null;
  if (isBodyMethod) {
    const buffer = await request.arrayBuffer();
    body = buffer.byteLength > 0 ? buffer : null;
  }

  // body가 없는데 Content-Type이 전달되면 백엔드가 415를 반환하므로 제거
  if (!body) {
    forwardHeaders.delete('content-type');
  }

  const response = await fetch(backendUrl, {
    method: request.method,
    headers: forwardHeaders,
    body,
    ...(body ? { duplex: 'half' } : {}),
  } as RequestInit);

  return new NextResponse(response.body, {
    status: response.status,
    headers: response.headers,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
