'use client';

import {
  type ShareIntentPayloadT,
  WEBBRIDGE_MESSAGE_TYPE,
  WEB_READY_MESSAGE_TYPE,
} from '@piki/core';
import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { usePostWishLink } from '@/hooks/usePostWishLink';
import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { WebBridge, isWebview } from '@/utils/webBridge';

const URL_PATTERN = /^https?:\/\/.+/i;

const getUrlFromShareIntent = (payload: ShareIntentPayloadT): string | null => {
  if (payload.webUrl) {
    const trimmedWebUrl = payload.webUrl.trim();
    if (URL_PATTERN.test(trimmedWebUrl)) return trimmedWebUrl;
  }

  if (payload.text) {
    const matchedUrl = payload.text.match(/https?:\/\/[^\s]+/i)?.[0];
    if (matchedUrl && URL_PATTERN.test(matchedUrl)) return matchedUrl;
  }

  return null;
};

/** 앱 공유(ShareIntent)로 전달된 상품 URL을 위시리스트에 등록 */
export const useShareIntentWish = () => {
  const hasProcessedRef = useRef(false);

  const { postWishLinkMutation } = usePostWishLink();

  const handleShareIntent = useCallback(
    (payload: ShareIntentPayloadT) => {
      if (hasProcessedRef.current) return;

      const url = getUrlFromShareIntent(payload);
      if (!url) {
        toast.error('공유된 링크를 찾을 수 없어요');
        return;
      }

      hasProcessedRef.current = true;
      postWishLinkMutation(url, {
        onSuccess: () => toast.success('위시에 상품을 담았어요'),
      });
    },
    [postWishLinkMutation]
  );

  /** RN에 share intent 수신 준비 완료 알림 */
  useEffect(() => {
    if (!isWebview()) return;

    WebBridge.postMessage({
      type: WEBBRIDGE_MESSAGE_TYPE.WEB_READY,
      payload: {
        type: WEB_READY_MESSAGE_TYPE.SHARE_INTENT,
      },
    });
  }, []);

  useWebBridgeMessage(
    useCallback(
      message => {
        if (message.type === WEBBRIDGE_MESSAGE_TYPE.SHARE_INTENT)
          handleShareIntent(message.payload);
      },
      [handleShareIntent]
    )
  );
};
