import { WEBVIEW_UA_TOKEN } from '@piki/core';

const APP_VERSION_PATTERN = new RegExp(`${WEBVIEW_UA_TOKEN}/([\\d.]+)`, 'i');

export const getAppVersion = (userAgent: string) => {
  const match = userAgent.match(APP_VERSION_PATTERN);
  return match?.[1] ?? null;
};
