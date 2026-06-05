import { WEBBRIDGE_MESSAGE_TYPE, WEBVIEW_UA_TOKEN, type WebBridgeMessageT } from '@piki/core';
import { useCallback, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { WebView } from 'react-native-webview';
import Webview from 'react-native-webview';

import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import { useWebviewCookieSync } from '@/hooks/useWebviewCookieSync';
import { handleOpenImagePicker } from '@/utils/handleImage';
import { WebBridge } from '@/utils/webBridge';

function Page() {
  const webviewRef = useRef<WebView | null>(null);
  const { handleLogin } = useSocialLogin();
  const { isSynced } = useWebviewCookieSync();

  const onWebviewMessage = useCallback(async (message: WebBridgeMessageT) => {
    if (message.type === WEBBRIDGE_MESSAGE_TYPE.OPEN_IMAGE_PICKER) {
      await handleOpenImagePicker(message.payload);
    }
    if (message.type === WEBBRIDGE_MESSAGE_TYPE.REQUEST_SOCIAL_LOGIN) {
      await handleLogin(message.payload.provider);
    }
  }, [handleLogin]);

  const { onMessage } = useWebBridgeMessage(onWebviewMessage);

  useEffect(() => {
    WebBridge.setRef(webviewRef);
    return () => WebBridge.clearRef(webviewRef);
  }, []);

  return (
    // REF: https://github.com/react-native-webview/react-native-webview/blob/5bc526fce5b9d6225df183bdf3d8cf542007d90a/docs/Reference.md
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Webview
        ref={webviewRef}
        style={{ flex: 1 }}
        applicationNameForUserAgent={WEBVIEW_UA_TOKEN}
        /**
         * - ios simulator 사용 시: `http://localhost:3000`
         * - 실기기 사용 시: LAN IP 주소 ex) `http://192.0.0.1:3000`
         */
        source={isSynced ? { uri: process.env.EXPO_PUBLIC_WEB_URL ?? 'http://localhost:3000' } : undefined}
        onMessage={onMessage}
        allowsBackForwardNavigationGestures
        cacheEnabled
        webviewDebuggingEnabled={__DEV__}
        startInLoadingState
      />
    </KeyboardAvoidingView>
  );
}

export default Page;
