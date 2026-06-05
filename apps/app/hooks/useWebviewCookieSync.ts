import CookieManager from '@react-native-cookies/cookies';
import { useEffect, useState } from 'react';

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

      if (accessToken) {
        await CookieManager.set(WEB_URL, {
          name: 'access_token',
          value: accessToken,
          path: '/',
        });
      }

      if (refreshToken) {
        await CookieManager.set(WEB_URL, {
          name: 'refresh_token',
          value: refreshToken,
          path: '/',
        });
      }

      setIsSynced(true);
    };

    sync();
  }, []);

  return { isSynced };
};
