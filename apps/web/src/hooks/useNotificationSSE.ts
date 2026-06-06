import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { ENDPOINTS } from '@/consts/api';
import { ROUTES } from '@/consts/route';
import type { NotificationSsePayloadT } from '@/types/notification';
import { getCookie } from '@/utils/cookie';
import { isWebview } from '@/utils/webBridge';

const MAX_RETRY_DELAY_MS = 30_000;

const resolveDeepLink = (payload: NotificationSsePayloadT): string | null => {
  const { type, refId, kind, tournamentId } = payload;

  switch (type) {
    case 'TOURNAMENT_JOINED':
    case 'TOURNAMENT_ITEM_ADDED':
      return ROUTES.TOURNAMENT_CREATE(refId);
    case 'ITEM_PARSING_COMPLETED':
    case 'ITEM_PARSING_FAILED':
      if (kind === 'TOURNAMENT' && tournamentId != null) {
        return ROUTES.TOURNAMENT_CREATE(tournamentId);
      }
      return ROUTES.ARCHIVE_BASE;
    default:
      return null;
  }
};

export const useNotificationSSE = (enabled: boolean) => {
  const router = useRouter();
  const retryDelayRef = useRef(1_000);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const connect = () => {
      if (cancelled) return;

      const controller = new AbortController();
      abortRef.current = controller;

      const headers: Record<string, string> = {
        Accept: 'text/event-stream',
      };

      if (isWebview()) {
        const accessToken = getCookie('access_token');
        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
      }

      fetchEventSource(ENDPOINTS.NOTIFICATIONS_SUBSCRIBE, {
        headers,
        credentials: 'include',
        signal: controller.signal,
        openWhenHidden: true,

        onopen: async response => {
          if (response.ok) {
            retryDelayRef.current = 1_000;
            return;
          }
          // 401이면 재연결하지 않음
          if (response.status === 401) {
            cancelled = true;
            throw new Error('unauthorized');
          }
          throw new Error(`SSE open failed: ${response.status}`);
        },

        onmessage: event => {
          if (event.event === 'notification') {
            try {
              const payload = JSON.parse(event.data) as NotificationSsePayloadT;
              const deepLink = resolveDeepLink(payload);

              toast(payload.title, {
                description: payload.body,
                action: deepLink
                  ? { label: '바로가기', onClick: () => router.push(deepLink) }
                  : undefined,
              });
            } catch {
              // malformed JSON — 무시
            }
          }
        },

        onerror: err => {
          if (cancelled) throw err; // fetchEventSource 재시도 중단

          const delay = retryDelayRef.current;
          retryDelayRef.current = Math.min(delay * 2, MAX_RETRY_DELAY_MS);

          // throw하면 fetchEventSource가 재시도 멈춤 → setTimeout으로 수동 재연결
          controller.abort();
          setTimeout(connect, delay);
          throw err;
        },
      });
    };

    connect();

    return () => {
      cancelled = true;
      abortRef.current?.abort();
    };
  }, [enabled, router]);
};
