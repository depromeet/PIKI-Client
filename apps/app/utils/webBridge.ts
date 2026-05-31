import type { WebBridgeMessageT } from '@piki/core';
import type { RefObject } from 'react';
import type { WebView } from 'react-native-webview';

let webviewRef: RefObject<WebView | null> | null = null;

export const WebBridge = {
  /** WebView 마운트 시 등록 */
  setRef(ref: RefObject<WebView | null>) {
    webviewRef = ref;
  },

  /** 등록 해제 */
  clearRef(ref: RefObject<WebView | null>) {
    if (webviewRef === ref) webviewRef = null;
  },

  /** RN에서 웹으로 메시지 전송 */
  postMessage(type: WebBridgeMessageT['type'], payload?: WebBridgeMessageT['payload']) {
    const target = webviewRef?.current;
    if (!target) return console.warn('[WEBVIEW] WebView 참조 없음');

    const message = { type, payload };
    target.postMessage(JSON.stringify(message));
  },
};
