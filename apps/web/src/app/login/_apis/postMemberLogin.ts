import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

import type { PostMemberLoginResponseT } from '../_types/login';

// TEMP
export const postMemberLogin = async (nickname: string) => {
  const { data } = await clientApi.post<ApiResponseT<PostMemberLoginResponseT>>(
    '/api/v1/dev/users',
    { nickname }
  );

  return data.data;
};
