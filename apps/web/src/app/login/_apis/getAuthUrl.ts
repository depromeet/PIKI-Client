import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';
import type { SocialProviderT } from '@/types/auth';
import { isValidLoginRedirectPath } from '@/utils/loginRedirect';

import type { GetAuthUrlResponseT } from '../_types/login';

export const getAuthUrl = async (provider: SocialProviderT, redirect: string | null) => {
  const callbackUrl = new URL(`/auth/callback/${provider}`, window.location.origin);
  if (isValidLoginRedirectPath(redirect)) callbackUrl.searchParams.set('redirect', redirect);

  const redirectUri = callbackUrl.toString();

  const { data } = await clientApi.get<ApiResponseT<GetAuthUrlResponseT>>(
    ENDPOINTS.AUTH_URL(provider),
    { params: { redirect, redirectUri } }
  );

  return data.data;
};
