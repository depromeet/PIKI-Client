import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

export const postLogout = async () => {
  const { data } = await clientApi.post<ApiResponseT<{ loggedOut: boolean }>>(
    ENDPOINTS.AUTH_LOGOUT
  );

  return data.data;
};
