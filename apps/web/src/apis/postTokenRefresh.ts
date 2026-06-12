import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import { serverApi } from './server';

export const postTokenRefreshServer = async () => {
  const response = await serverApi.post<
    ApiResponseT<{ accessToken: string | null; refreshToken: string | null }>
  >(ENDPOINTS.AUTH_TOKEN_REFRESH);

  return response;
};
