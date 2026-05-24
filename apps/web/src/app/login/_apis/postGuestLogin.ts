import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

import type { PostLoginResponseT } from '../_types/login';

export const postGuestLogin = async () => {
  const { data } = await clientApi.post<ApiResponseT<PostLoginResponseT>>('/api/v1/auth/guest');

  return data.data;
};
