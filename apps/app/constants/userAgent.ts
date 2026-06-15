import { WEBVIEW_UA_TOKEN } from '@piki/core';
import Constants from 'expo-constants';

export const USER_AGENT = (() => {
  const appVersion = Constants.expoConfig?.version;
  return appVersion ? `${WEBVIEW_UA_TOKEN}/${appVersion}` : `${WEBVIEW_UA_TOKEN}`;
})();
