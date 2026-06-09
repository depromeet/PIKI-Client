import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

import type { PostGuestLoginResponseT } from '../_types/login';

export const postGuestLogin = async () => {
  // body 없는 POST 라도 빈 객체로 보내야 일부 백엔드가 Content-Type 인식 후 처리한다 (415 방지).
  const { data } = await clientApi.post<ApiResponseT<PostGuestLoginResponseT>>(
    '/api/v1/auth/guest',
    {}
  );

  return data.data;
};
