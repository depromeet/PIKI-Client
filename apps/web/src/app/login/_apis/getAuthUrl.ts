import type { SocialProviderT } from '@piki/core';

import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import { ROUTES } from '@/consts/route';
import type { ApiResponseT } from '@/types/api';

import type { GetAuthUrlResponseT } from '../_types/login';

export const getAuthUrl = async (provider: SocialProviderT, redirect: string | null) => {
  // Apple은 BE 브릿지 URL을 redirect_uri로 사용하므로 FE에서 override하지 않음
  const redirectUri =
    provider === 'apple'
      ? undefined
      : `${window.location.origin}${ROUTES.SOCIAL_LOGIN_CALLBACK(provider)}`;

  const { data } = await clientApi.get<ApiResponseT<GetAuthUrlResponseT>>(
    ENDPOINTS.AUTH_URL(provider),
    { params: { redirect, ...(redirectUri && { redirectUri }) } }
  );

  return data.data;
};
