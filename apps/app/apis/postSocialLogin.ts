import type { SocialProviderT } from '@piki/core';

type PostSocialLoginRequestT = {
  accessToken: string;
};

type PostSocialLoginResponseT = {
  accessToken: string;
  refreshToken: string;
};

export const postSocialLogin = async (
  provider: SocialProviderT,
  body: PostSocialLoginRequestT
): Promise<PostSocialLoginResponseT> => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/login/${provider}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'app',
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.detail ?? '로그인에 실패했습니다.');

  return data.data;
};
