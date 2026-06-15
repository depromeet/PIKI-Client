import { cookies } from 'next/headers';

const UPSTREAM_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications/subscribe`;

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return new Response(null, { status: 401 });
  }

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(UPSTREAM_URL, {
      headers: {
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${accessToken}`,
        'X-Client-Type': 'web',
      },
    });
  } catch {
    return new Response(null, { status: 502 });
  }

  if (!upstreamResponse.ok) {
    return new Response(null, { status: upstreamResponse.status });
  }

  return new Response(upstreamResponse.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
