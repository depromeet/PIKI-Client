import { WEBBRIDGE_MESSAGE_TYPE, WEBVIEW_UA_TOKEN, type WebBridgeMessageT } from '@piki/core';
import { useCallback, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { WebView } from 'react-native-webview';
import Webview from 'react-native-webview';

import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { handleOpenImagePicker } from '@/utils/handleImage';
import { getSecureItem, setSecureItem } from '@/utils/secureStore';
import { WebBridge } from '@/utils/webBridge';

function Page() {
  const webviewRef = useRef<WebView | null>(null);

  const onWebviewMessage = useCallback(async (message: WebBridgeMessageT) => {
    switch (message.type) {
      case WEBBRIDGE_MESSAGE_TYPE.OPEN_IMAGE_PICKER:
        await handleOpenImagePicker(message.payload);
        break;

      case WEBBRIDGE_MESSAGE_TYPE.STORE_TOKEN:
        if (message.payload.accessToken)
          await setSecureItem('access_token', message.payload.accessToken);
        if (message.payload.refreshToken)
          await setSecureItem('refresh_token', message.payload.refreshToken);
        break;

      case WEBBRIDGE_MESSAGE_TYPE.WEB_READY_TO_RECEIVE_TOKEN: {
        const accessToken = await getSecureItem('access_token');
        const refreshToken = await getSecureItem('refresh_token');
        WebBridge.postMessage({
          type: WEBBRIDGE_MESSAGE_TYPE.SET_APP_TOKEN,
          payload: {
            accessToken,
            refreshToken,
          },
        });
      }
    }
  }, []);

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
        // TEMP: URI env에 등록하여 사용 예정
        source={{ uri: 'http://localhost:3000' }}
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
