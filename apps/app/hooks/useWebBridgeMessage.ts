import { type WebBridgeMessageT, isWebBridgeMessageT } from '@piki/core';
import { useCallback } from 'react';
import type { WebViewMessageEvent } from 'react-native-webview';

/** 웹뷰 메시지 수신 훅 */
export const useWebBridgeMessage = (handler: (message: WebBridgeMessageT) => void) => {
  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const message = event.nativeEvent.data;
        if (!message) {
          console.error('[WEBVIEW] 수신 메시지 존재하지 않음');
          return;
        }

        const parsedMessage = JSON.parse(message);
        if (!isWebBridgeMessageT(parsedMessage)) {
          console.error('[WEBVIEW] 수신 메시지 형식 오류', parsedMessage);
          return;
        }

        console.log('[WEBVIEW] 수신 메시지:', parsedMessage);
        handler(parsedMessage);
      } catch {
        console.error('[WEBVIEW] 오류', event.nativeEvent.data);
      }
    },
    [handler]
  );

  return { onMessage };
};
