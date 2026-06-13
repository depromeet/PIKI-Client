import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostGuestLoginResponseT } from '../_types/login';

export const postGuestLogin = async () => {
  const { data } = await clientApi.post<ApiResponseT<PostGuestLoginResponseT>>(
    ENDPOINTS.AUTH_GUEST,
    null
  );

  return data.data;
};

// NOTE: response 자체를 활용하기 위해 return data.data 대신 response 그대로 반환
export const postGuestLoginServer = async () => {
  const response = await serverApi.post<ApiResponseT<PostGuestLoginResponseT>>(
    ENDPOINTS.AUTH_GUEST,
    null
  );
  return response;
};
