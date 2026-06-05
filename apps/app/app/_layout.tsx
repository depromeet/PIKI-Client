import { initializeKakaoSDK } from '@react-native-kakao/core';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

// 카카오 네이티브 앱 키로 SDK 초기화 (앱 실행 시 1회)
initializeKakaoSDK(process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY ?? '');

// Google Sign-In 설정
// iosClientId: iOS OAuth 2.0 클라이언트 ID
// webClientId: 백엔드 토큰 검증용 웹 클라이언트 ID (accessToken 발급에 필요)
GoogleSignin.configure({
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? '',
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '',
});

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default RootLayout;
