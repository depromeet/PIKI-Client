import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { Stack } from 'expo-router';
import { ShareIntentProvider } from 'expo-share-intent';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import PushNotificationProvider from '@/components/PushNotificationProvider';

initializeKakaoSDK(process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY ?? '');

GoogleSignin.configure({
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? '',
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '',
});
function RootLayout() {
  return (
    <ShareIntentProvider
      options={{
        scheme: 'piki',
      }}
    >
      <PushNotificationProvider />
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </ShareIntentProvider>
  );
}

export default RootLayout;
