import { Stack } from 'expo-router';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default RootLayout;
