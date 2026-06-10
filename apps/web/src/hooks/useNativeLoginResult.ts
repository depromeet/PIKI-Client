import { WEBBRIDGE_MESSAGE_TYPE, isWebBridgeMessageT } from '@piki/core';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { setCookie } from '@/utils/cookie';
import { getLoginPath, getLoginRedirectPath } from '@/utils/loginRedirect';
import { WebBridge } from '@/utils/webBridge';

export const useNativeLoginResult = (redirect: string | null) => {
  const router = useRouter();

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        if (!isWebBridgeMessageT(parsed)) return;

        if (parsed.type === WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_SUCCESS) {
          const { accessToken, refreshToken } = parsed.payload;
          setCookie('access_token', accessToken, { minutes: 15 });
          setCookie('refresh_token', refreshToken, { days: 14 });
          /** 쿠키 세팅 후 FCM 토큰 재등록 — 로그인 전 첫 시도는 인증 없어서 실패하기 때문 */
          WebBridge.postMessage({ type: WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_PUSH_PERMISSION_STATUS });
          router.replace(getLoginRedirectPath(redirect));
        } else if (parsed.type === WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_ERROR) {
          router.replace(getLoginPath(redirect));
        }
      } catch (_e) {
        /** JSON.parse 실패 등 유효하지 않은 메시지는 무시 */
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [redirect, router]);
};
