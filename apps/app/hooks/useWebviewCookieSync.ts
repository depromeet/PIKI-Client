import CookieManager from '@react-native-cookies/cookies';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { TokenStorage } from '@/utils/tokenStorage';

const WEB_URL = process.env.EXPO_PUBLIC_WEB_URL ?? 'http://localhost:3000';

/**
 * expo-secure-store의 토큰을 WebView 쿠키 저장소에 동기화
 * WebView 첫 요청 전에 쿠키가 심어져야 RSC 프리페치가 정상 동작함
 */
export const useWebviewCookieSync = () => {
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const sync = async () => {
      const accessToken = await TokenStorage.getAccessToken();
      const refreshToken = await TokenStorage.getRefreshToken();

      // iOS WKWebView는 WKHTTPCookieStore를 사용하므로 useWebKit: true 필요
      const useWebKit = Platform.OS === 'ios';

      if (accessToken) {
        await CookieManager.set(
          WEB_URL,
          { name: 'access_token', value: accessToken, path: '/' },
          useWebKit
        );
      }

      if (refreshToken) {
        await CookieManager.set(
          WEB_URL,
          { name: 'refresh_token', value: refreshToken, path: '/' },
          useWebKit
        );
      }

      setIsSynced(true);
    };

    sync();
  }, []);

  return { isSynced };
};
