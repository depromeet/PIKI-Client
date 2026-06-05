import messaging from '@react-native-firebase/messaging';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.warn('Background FCM message:', remoteMessage);
});

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default RootLayout;
