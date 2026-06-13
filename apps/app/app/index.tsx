import {
  WEBBRIDGE_MESSAGE_TYPE,
  WEB_REQ_READY_PAYLOAD_TYPE,
  type WebBridgeMessageT,
} from '@piki/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Linking, Platform } from 'react-native';
import type { WebView } from 'react-native-webview';
import Webview from 'react-native-webview';

import { USER_AGENT } from '@/constants/userAgent';
import { useShareIntent } from '@/hooks/useShareIntent';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { useWebDeepLink } from '@/hooks/useWebDeepLink';
import { useWebviewCookieSync } from '@/hooks/useWebviewCookieSync';
import { handleOpenImagePicker } from '@/utils/handleImage';
import { handleRequestPushPermission, syncPushStatusToWeb } from '@/utils/pushNotification';
import { TokenStorage } from '@/utils/tokenStorage';
import { WebBridge } from '@/utils/webBridge';

function Page() {
  const webviewRef = useRef<WebView | null>(null);
  const [webviewUri, setWebviewUri] = useState(
    process.env.EXPO_PUBLIC_WEB_URL ?? 'http://localhost:3000'
  );

  const { handleLogin } = useSocialLogin();
  const { isSynced } = useWebviewCookieSync();

  const handleWebviewUriChange = useCallback((uri: string) => setWebviewUri(uri), []);

  useWebDeepLink(handleWebviewUriChange);

  useEffect(() => {
    WebBridge.setRef(webviewRef);
    return () => WebBridge.clearRef(webviewRef);
  }, []);

  const { sendShareIntent } = useShareIntent({
    onChangeWebviewUri: handleWebviewUriChange,
    webviewUri,
  });

  const handleWebMessage = useCallback(
    async (message: WebBridgeMessageT) => {
      switch (message.type) {
        case WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_READY: {
          const { type } = message.payload;
          if (type === WEB_REQ_READY_PAYLOAD_TYPE.SHARE_INTENT) sendShareIntent();
          return;
        }

        case WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_OPEN_IMAGE_PICKER:
          await handleOpenImagePicker(message.payload);
          return;
        case WEBBRIDGE_MESSAGE_TYPE.REQUEST_SOCIAL_LOGIN:
          await handleLogin(message.payload.provider);
          return;

        case WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_PUSH_PERMISSION_STATUS:
          await syncPushStatusToWeb();
          return;

        case WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_PUSH_PERMISSION:
          await handleRequestPushPermission();
          return;

        case WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_OPEN_NOTIFICATION_SETTINGS:
          await Linking.openSettings();
          return;

        case WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_LOGOUT:
          await TokenStorage.clearTokens();
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
          applicationNameForUserAgent={USER_AGENT}
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
