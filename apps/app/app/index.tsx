import {
  WEBBRIDGE_MESSAGE_TYPE,
  WEBVIEW_UA_TOKEN,
  WEB_READY_MESSAGE_TYPE,
  type WebBridgeMessageT,
} from '@piki/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { WebView } from 'react-native-webview';
import Webview from 'react-native-webview';

import { useShareIntent } from '@/hooks/useShareIntent';
import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import { useWebviewCookieSync } from '@/hooks/useWebviewCookieSync';
import { handleOpenImagePicker } from '@/utils/handleImage';
import { WebBridge } from '@/utils/webBridge';

function Page() {
  const webviewRef = useRef<WebView | null>(null);
  const [webviewUri, setWebviewUri] = useState(process.env.EXPO_PUBLIC_WEB_URL ?? 'http://localhost:3000');
  const { handleLogin } = useSocialLogin();
  const { isSynced } = useWebviewCookieSync();

  useEffect(() => {
    WebBridge.setRef(webviewRef);
    return () => WebBridge.clearRef(webviewRef);
  }, []);

  const handleWebviewUriChange = useCallback((uri: string) => setWebviewUri(uri), []);

  const { sendShareIntent } = useShareIntent({
    onChangeWebviewUri: handleWebviewUriChange,
    webviewUri,
  });

  const handleWebMessage = useCallback(
    async (message: WebBridgeMessageT) => {
      switch (message.type) {
        case WEBBRIDGE_MESSAGE_TYPE.WEB_READY: {
          const { type } = message.payload;
          if (type === WEB_READY_MESSAGE_TYPE.SHARE_INTENT) sendShareIntent();
          return;
        }
        case WEBBRIDGE_MESSAGE_TYPE.OPEN_IMAGE_PICKER:
          await handleOpenImagePicker(message.payload);
          return;
        case WEBBRIDGE_MESSAGE_TYPE.REQUEST_SOCIAL_LOGIN:
          await handleLogin(message.payload.provider);
          return;
        default:
          return;
      }
    },
    [sendShareIntent, handleLogin]
  );

  const { onMessage } = useWebBridgeMessage(handleWebMessage);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {isSynced && (
        <Webview
          ref={webviewRef}
          style={{ flex: 1 }}
          applicationNameForUserAgent={WEBVIEW_UA_TOKEN}
          source={{ uri: webviewUri }}
          onMessage={onMessage}
          allowsBackForwardNavigationGestures
          cacheEnabled
          webviewDebuggingEnabled={__DEV__}
          startInLoadingState
        />
      )}
    </KeyboardAvoidingView>
  );
}

export default Page;
