import * as Linking from 'expo-linking';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { extractWebPathFromUrl } from '@/utils/webDeepLink';

const WEB_BASE_URL = process.env.EXPO_PUBLIC_WEB_URL;

const parseWebPath = (url: string): string | null => {
  /** Universal Link / Smart App Banner — 전체 https URL (https://piki.day/...) */
  const webFromUrl = extractWebPathFromUrl(url);
  if (webFromUrl) return webFromUrl;

  /** share extension — piki:///?web=/path */
  const { queryParams } = Linking.parse(url);
  const web = queryParams?.web;

  if (typeof web === 'string' && web.startsWith('/')) return web;
  if (Array.isArray(web) && typeof web[0] === 'string' && web[0].startsWith('/')) return web[0];

  return null;
};

const toWebviewUri = (webPath: string) => new URL(webPath, WEB_BASE_URL).toString();

/**
 * 딥링크를 WebView URI로 반영 (cold + warm start)
 * - share extension openHostApp `/?web=...`
 * - Universal Link / Smart App Banner(app-argument) `https://piki.day/...`
 */
export const useWebDeepLink = (onChangeWebviewUri: (uri: string) => void) => {
  const { web } = useLocalSearchParams<{ web?: string }>();

  /** cold start — Expo Router search param */
  useEffect(() => {
    if (typeof web !== 'string' || !web.startsWith('/')) return;

    onChangeWebviewUri(toWebviewUri(web));
  }, [web, onChangeWebviewUri]);

  /** warm start — 앱이 백그라운드에 있을 때 Linking 이벤트 */
  useEffect(() => {
    const handleUrl = ({ url }: { url: string }) => {
      const webPath = parseWebPath(url);
      if (!webPath) return;

      onChangeWebviewUri(toWebviewUri(webPath));
    };

    const subscription = Linking.addEventListener('url', handleUrl);
    return () => subscription.remove();
  }, [onChangeWebviewUri]);
};
