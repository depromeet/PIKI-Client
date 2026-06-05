import { initializeKakaoSDK } from '@react-native-kakao/core';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

// 카카오 네이티브 앱 키로 SDK 초기화 (앱 실행 시 1회)
initializeKakaoSDK('326734abdf8de5c7e090a2fc72e1dce6');

// Google Sign-In 설정
// iosClientId: iOS OAuth 2.0 클라이언트 ID
// webClientId: 백엔드 토큰 검증용 웹 클라이언트 ID (accessToken 발급에 필요)
GoogleSignin.configure({
  iosClientId: '978975594396-mo5b39fe8fqfuukqkf42p63tlqkc4785.apps.googleusercontent.com',
  webClientId: '978975594396-kgl5nei9occteirhlsk9mep9r65t83bn.apps.googleusercontent.com',
});

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default RootLayout;
