import { Stack } from 'expo-router';
import { ShareIntentProvider } from 'expo-share-intent';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

function RootLayout() {
  return (
    <ShareIntentProvider
      options={{
        scheme: 'piki',
      }}
    >
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </ShareIntentProvider>
  );
}

export default RootLayout;
