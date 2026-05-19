import { type ShareIntentPayloadT, WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useShareIntentContext } from 'expo-share-intent';
import { useCallback, useEffect, useRef } from 'react';

import { toShareIntentPayload } from '@/utils/serializeShareIntent';
import { WebBridge } from '@/utils/webBridge';

const SHARE_INTENT_PATH = '/temp';

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

    WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.SHARE_INTENT, pending);
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

      /** 이미 /temp 페이지: 즉시 전송 */
      if (nextUri.pathname.startsWith(SHARE_INTENT_PATH)) {
        sendShareIntent();
        return;
      }

      /** 다른 페이지: payload 전송 대기 후 /temp로 이동 -> 웹의 WEB_READY 수신 시점에 전송 */
      nextUri.pathname = SHARE_INTENT_PATH;
      nextUri.search = '';
      nextUri.hash = '';
      onChangeWebviewUri(nextUri.toString());
    } catch {
      return;
    }
  }, [hasShareIntent, onChangeWebviewUri, shareIntent, webviewUri, sendShareIntent]);

  return { sendShareIntent };
};
