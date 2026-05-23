/** Learn more https://docs.expo.io/guides/customizing-metro */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig } = require('expo/metro-config');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withShareExtension } = require('expo-share-extension/metro');

module.exports = withShareExtension(getDefaultConfig(__dirname), {
  isCSSEnabled: true,
});
