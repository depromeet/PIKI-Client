import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';
import { isWebview } from '@/utils/webBridge';

import type { PostGuestLoginResponseT } from '../_types/login';

export const postGuestLogin = async () => {
  const { data } = await clientApi.post<ApiResponseT<PostGuestLoginResponseT>>(
    '/api/v1/auth/guest',
    null,
    {
      headers: { 'X-Client-Type': isWebview() ? 'app' : 'web' },
    }
  );

  return data.data;
};
