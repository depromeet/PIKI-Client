import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { setCookie } from '@/utils/cookie';

export const useNativeLoginResult = () => {
  const router = useRouter();

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_SUCCESS) {
          const { accessToken, refreshToken } = message.payload;
          setCookie('access_token', accessToken);
          setCookie('refresh_token', refreshToken);
          router.replace('/home');
        } else if (message.type === WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_ERROR) {
          router.replace('/login');
        }
      } catch {}
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [router]);
};
