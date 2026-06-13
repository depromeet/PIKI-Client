import type { SocialProviderT } from '@piki/core';

import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import { ROUTES } from '@/consts/route';
import type { ApiResponseT } from '@/types/api';

import type { GetAuthUrlResponseT } from '../_types/login';

export const getAuthUrl = async (provider: SocialProviderT, redirect: string | null) => {
  const redirectUri = `${window.location.origin}${ROUTES.SOCIAL_LOGIN_CALLBACK(provider)}`;

  const { data } = await clientApi.get<ApiResponseT<GetAuthUrlResponseT>>(
    ENDPOINTS.AUTH_URL(provider),
    { params: { redirect, redirectUri } }
  );

  return data.data;
};
