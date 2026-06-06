import { WEBBRIDGE_MESSAGE_TYPE, isWebBridgeMessageT } from '@piki/core';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { setCookie } from '@/utils/cookie';

export const useNativeLoginResult = () => {
  const router = useRouter();

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        if (!isWebBridgeMessageT(parsed)) return;

        if (parsed.type === WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_SUCCESS) {
          const { accessToken, refreshToken } = parsed.payload;
          setCookie('access_token', accessToken);
          setCookie('refresh_token', refreshToken);
          router.replace('/home');
        } else if (parsed.type === WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_ERROR) {
          router.replace('/login');
        }
      } catch (_e) {
        // JSON.parse 실패 등 유효하지 않은 메시지는 무시
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [router]);
};
