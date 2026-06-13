import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostGuestLoginResponseT } from '../_types/login';

export const postGuestLogin = async () => {
  // body 없는 POST 라도 빈 객체로 보내야 일부 백엔드가 Content-Type 인식 후 처리한다 (415 방지).
  const { data } = await clientApi.post<ApiResponseT<PostGuestLoginResponseT>>(
    ENDPOINTS.AUTH_GUEST,
    {}
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
