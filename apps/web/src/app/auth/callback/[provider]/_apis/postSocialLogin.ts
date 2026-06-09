import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';
import type { SocialProviderT } from '@piki/core';

import type { PostSocialLoginResponseT } from '@/types/auth';

type PostSocialLoginRequestT = {
  code: string;
  redirectUri: string;
  state: string;
};

export const postSocialLogin = async (
  provider: SocialProviderT,
  { code, redirectUri, state }: PostSocialLoginRequestT
) => {
  const { data } = await clientApi.post<ApiResponseT<PostSocialLoginResponseT>>(
    ENDPOINTS.AUTH_LOGIN(provider),
    { code, redirectUri, state }
  );

  return data.data;
};
