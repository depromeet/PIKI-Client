import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import Webview from 'react-native-webview'

export default function Page() {
  return (
    // REF: https://github.com/react-native-webview/react-native-webview/blob/5bc526fce5b9d6225df183bdf3d8cf542007d90a/docs/Reference.md
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Webview
        style={{ flex: 1 }}
        /**
         * - ios simulator 사용 시: `http://localhost:3000`
         * - 실기기 사용 시: LAN IP 주소 ex) `http://192.0.0.1:3000`
         */
        // TEMP: URI env에 등록하여 사용 예정
        source={{ uri: 'https://www.naver.com/' }}
        allowsBackForwardNavigationGestures
        cacheEnabled
        webviewDebuggingEnabled
        startInLoadingState
      />
    </KeyboardAvoidingView>
  )
}
