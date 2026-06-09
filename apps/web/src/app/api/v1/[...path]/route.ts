import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = new URL(request.url);
  const backendUrl = `${API_URL}/api/v1/${path.join('/')}${url.search}`;

  const cookieStore = await cookies();
  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.set('Cookie', cookieStore.toString());
  forwardHeaders.delete('host');
  forwardHeaders.delete('origin');
  forwardHeaders.delete('referer');

  const response = await fetch(backendUrl, {
    method: request.method,
    headers: forwardHeaders,
    body: ['GET', 'HEAD'].includes(request.method) ? null : request.body,
    duplex: 'half',
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
