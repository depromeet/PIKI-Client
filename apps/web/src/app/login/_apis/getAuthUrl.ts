import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';
import type { SocialProviderT } from '@/types/auth';

import type { GetAuthUrlResponseT } from '../_types/login';

export const getAuthUrl = async (provider: SocialProviderT) => {
  const redirectUri = `${window.location.origin}/auth/callback/${provider}`;

  const { data } = await clientApi.get<ApiResponseT<GetAuthUrlResponseT>>(
    ENDPOINTS.AUTH_URL(provider),
    { params: { redirectUri } }
  );

  return data.data;
};
