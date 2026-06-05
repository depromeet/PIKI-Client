import {
  WEBBRIDGE_MESSAGE_TYPE,
  WEBVIEW_UA_TOKEN,
  WEB_REQ_READY_PAYLOAD_TYPE,
  type WebBridgeMessageT,
} from '@piki/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Linking, Platform } from 'react-native';
import type { WebView } from 'react-native-webview';
import Webview from 'react-native-webview';

import { useShareIntent } from '@/hooks/useShareIntent';
import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { handleOpenImagePicker } from '@/utils/handleImage';
import { handleRequestPushPermission, syncPushStatusToWeb } from '@/utils/pushNotification';
import { WebBridge } from '@/utils/webBridge';

/** TODO: 추후 env로 분리 */
const WEBVIEW_URI = 'http://192.168.45.109:3000';

function Page() {
  const webviewRef = useRef<WebView | null>(null);
  /**
   * - ios simulator 사용 시: `http://localhost:3000`
   * - 실기기 사용 시: LAN IP 주소 ex) `http://192.0.0.1:3000`
   */
  const [webviewUri, setWebviewUri] = useState(WEBVIEW_URI);

  useEffect(() => {
    WebBridge.setRef(webviewRef);
    return () => WebBridge.clearRef(webviewRef);
  }, []);

  const handleWebviewUriChange = useCallback((uri: string) => setWebviewUri(uri), []);

  const { sendShareIntent } = useShareIntent({
    onChangeWebviewUri: handleWebviewUriChange,
    webviewUri,
  });

  /** 웹 → 앱 메시지 처리 */
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

        case WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_PUSH_PERMISSION_STATUS:
          await syncPushStatusToWeb();
          return;

        case WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_PUSH_PERMISSION:
          await handleRequestPushPermission();
          return;

        case WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_OPEN_NOTIFICATION_SETTINGS:
          await Linking.openSettings();
          return;

        default:
          return;
      }
    },
    [sendShareIntent]
  );

  const { onMessage } = useWebBridgeMessage(handleWebMessage);

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
        source={{ uri: webviewUri }}
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
