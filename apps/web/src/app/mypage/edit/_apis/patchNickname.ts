import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';
import type { UserT } from '@/types/user';

export const patchNickname = async (nickname: string) => {
  const { data } = await clientApi.patch<ApiResponseT<UserT>>(ENDPOINTS.USER, { nickname });

  return data.data;
};
