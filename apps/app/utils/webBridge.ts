import type { WebBridgeMessageT } from '@repo/core';
import type { RefObject } from 'react';
import type { WebView } from 'react-native-webview';

let webviewRef: RefObject<WebView | null> | null = null;

export const WebBridge = {
  /** 최초 1회 WebView 등록 */
  setRef(ref: RefObject<WebView | null>) {
    webviewRef = ref;
  },

  /** RN에서 웹으로 메시지 전송 */
  postMessage(type: WebBridgeMessageT['type'], payload?: WebBridgeMessageT['payload']) {
    const target = webviewRef?.current;
    if (!target) return console.warn('[WEBVIEW] WebView 참조 없음');

    const message: WebBridgeMessageT = { type, payload };
    target.postMessage(JSON.stringify(message));
  },
};
