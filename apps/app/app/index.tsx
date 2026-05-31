import { WEBBRIDGE_MESSAGE_TYPE, type WebBridgeMessageT } from '@piki/core';
import { useCallback, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { WebView } from 'react-native-webview';
import Webview from 'react-native-webview';

import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { handleOpenImagePicker } from '@/utils/handleImage';
import { WebBridge } from '@/utils/webBridge';

function Page() {
  const webviewRef = useRef<WebView | null>(null);

  const onWebviewMessage = useCallback(async (message: WebBridgeMessageT) => {
    if (message.type === WEBBRIDGE_MESSAGE_TYPE.OPEN_IMAGE_PICKER) {
      await handleOpenImagePicker(message.payload);
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
