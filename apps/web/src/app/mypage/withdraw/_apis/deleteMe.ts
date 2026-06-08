import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

export const deleteMe = async () => {
  const { data } = await clientApi.delete<ApiResponseT<null>>(ENDPOINTS.USER);

  return data.data;
};
