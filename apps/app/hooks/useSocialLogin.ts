import { WEBBRIDGE_MESSAGE_TYPE, type SocialProviderT } from '@piki/core';
import { login as kakaoLogin } from '@react-native-kakao/user';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useCallback } from 'react';

import { postSocialLogin } from '@/apis/postSocialLogin';
import { TokenStorage } from '@/utils/tokenStorage';
import { WebBridge } from '@/utils/webBridge';

export const useSocialLogin = () => {
  const handleLogin = useCallback(async (provider: SocialProviderT) => {
    try {
      let accessToken: string;

      if (provider === 'kakao') {
        const result = await kakaoLogin();
        accessToken = result.accessToken;
      } else {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();
        const { accessToken: googleAccessToken } = await GoogleSignin.getTokens();
        if (!googleAccessToken) throw new Error('Google Access Token을 받지 못했습니다.');
        accessToken = googleAccessToken;
      }

      const body = { accessToken };
      const { accessToken: jwtAccessToken, refreshToken } = await postSocialLogin(provider, body);

      await TokenStorage.setTokens(jwtAccessToken, refreshToken);

      WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_SUCCESS, {
        accessToken: jwtAccessToken,
        refreshToken,
      });
    } catch (error) {
      WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_ERROR, {
        detail: error instanceof Error ? error.message : '로그인에 실패했습니다.',
      });
    }
  }, []);

  return { handleLogin };
};
