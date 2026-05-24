import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

import type { PostLoginResponseT } from '../_types/login';

// TEMP
export const postMemberLogin = async (nickname: string, accessToken: string) => {
  const { data } = await clientApi.post<ApiResponseT<PostLoginResponseT>>(
    '/api/v1/dev/users',
    { nickname },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return data.data;
};
