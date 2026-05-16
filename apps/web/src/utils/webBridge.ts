import type { WebBridgeMessageT } from '@piki/core';

type RNWebViewWindowT = {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

/** RN WebView window인지 타입 가드 */
const isRNWebViewWindow = (window: unknown): window is RNWebViewWindowT => {
  if (typeof window !== 'object' || window === null) return false;
  if (!('ReactNativeWebView' in window)) return false;

  const rnWebview = window['ReactNativeWebView'];
  if (typeof rnWebview !== 'object' || rnWebview === null) return false;
  if (!('postMessage' in rnWebview)) return false;
  return typeof rnWebview['postMessage'] === 'function';
};

/** 현재 환경이 RN WebView인지 여부 */
export const isWebview = () => {
  if (typeof window === 'undefined') return false;
  return isRNWebViewWindow(window);
};

/**
 * Webview 메시지 송신 핸들러
 *
 * @example
 * WebBridge.postMessage('HELLO_FROM_WEB', '안녕 RN!')
 */
export const WebBridge = {
  postMessage(type: WebBridgeMessageT['type'], payload?: WebBridgeMessageT['payload']) {
    if (typeof window === 'undefined') return;
    if (!isRNWebViewWindow(window)) return;

    const message = JSON.stringify({ type, payload });

    window.ReactNativeWebView.postMessage(message);
  },
};
