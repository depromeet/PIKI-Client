import { type ShareIntentPayloadT, WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useShareIntentContext } from 'expo-share-intent';
import { useCallback, useEffect, useRef } from 'react';

import { toShareIntentPayload } from '@/utils/serializeShareIntent';
import { WebBridge } from '@/utils/webBridge';

const ARCHIVE_PATH = '/archive';
const ARCHIVE_WISH_TAB = 'wish';

const isArchiveWishTab = (uri: URL) => {
  if (uri.pathname !== ARCHIVE_PATH) return false;

  const tab = uri.searchParams.get('tab');
  return tab === null || tab === ARCHIVE_WISH_TAB;
};

type Props = {
  onChangeWebviewUri: (uri: string) => void;
  webviewUri: string;
};

/** 다른 앱에서의 share intent 수신과 웹으로의 전달 흐름을 관리 */
export const useShareIntent = ({ onChangeWebviewUri, webviewUri }: Props) => {
  const pendingShareIntentRef = useRef<ShareIntentPayloadT | null>(null);

  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntentContext();

  /** pending payload를 웹으로 전송하고 ref/native intent 정리 */
  const sendShareIntent = useCallback(() => {
    const pending = pendingShareIntentRef.current;
    if (!pending) return;

    WebBridge.postMessage({ type: WEBBRIDGE_MESSAGE_TYPE.APP_RES_SHARE_INTENT, payload: pending });
    resetShareIntent();
    pendingShareIntentRef.current = null;
  }, [resetShareIntent]);

  /** 다른 앱에서 ShareIntent 수신 후 웹으로 전송 */
  useEffect(() => {
    if (!hasShareIntent) return;
    if (pendingShareIntentRef.current) return;

    pendingShareIntentRef.current = toShareIntentPayload(shareIntent);

    try {
      const nextUri = new URL(webviewUri);

      /** 이미 아카이브 위시 탭: 즉시 전송 */
      if (isArchiveWishTab(nextUri)) {
        sendShareIntent();
        return;
      }

      /** 다른 페이지: payload 보관 후 아카이브 위시 탭으로 이동 → WEB_REQ_READY 수신 시 전송 */
      nextUri.pathname = ARCHIVE_PATH;
      nextUri.search = `?tab=${ARCHIVE_WISH_TAB}`;
      nextUri.hash = '';
      onChangeWebviewUri(nextUri.toString());
    } catch {
      return;
    }
  }, [hasShareIntent, onChangeWebviewUri, shareIntent, webviewUri, sendShareIntent]);

  return { sendShareIntent };
};
