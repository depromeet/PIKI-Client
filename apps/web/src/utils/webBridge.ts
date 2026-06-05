import { WEBVIEW_UA_TOKEN, type WebBridgeMessageT } from '@piki/core';

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

/**
 * @param userAgentFromServer 서버 환경일 때 전달받은 user-agent
 * @returns 현재 환경이 RN WebView(앱)인 경우 true, 그 외 경우 false
 *
 * @example 클라이언트 환경일 때
 * isWebview()
 *
 * @example 서버 환경일 때
 * const headerStore = await headers();
 * const userAgent = headerStore.get('user-agent');
 * isWebview(userAgent)
 */
export const isWebview = (userAgentFromServer: string | null = null) => {
  /** 클라이언트 환경일 떄 */
  if (typeof window !== 'undefined') {
    const isAppByUA = navigator.userAgent.includes(WEBVIEW_UA_TOKEN);
    const isAppByWindow = isRNWebViewWindow(window);

    return isAppByUA || isAppByWindow;
  }

  /** 서버 환경일 때 */
  if (userAgentFromServer) return userAgentFromServer.includes(WEBVIEW_UA_TOKEN);
  return false;
};

/**
 * Webview 메시지 송신 핸들러
 *
 * @example
 * WebBridge.postMessage('HELLO_FROM_WEB', '안녕 RN!')
 */
export const WebBridge = {
  postMessage(
    type: WebBridgeMessageT['type'],
    payload?: Extract<WebBridgeMessageT, { payload: unknown }>['payload']
  ) {
    if (typeof window === 'undefined') return;
    if (!isRNWebViewWindow(window)) return;

    const message = JSON.stringify({ type, payload });

    window.ReactNativeWebView.postMessage(message);
  },
};
