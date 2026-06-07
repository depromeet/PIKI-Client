import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

export const getNicknameCheck = async (nickname: string) => {
  const { data } = await clientApi.get<ApiResponseT<{ available: boolean }>>(
    `/api/v1/users/nickname/check?nickname=${nickname}`
  );

  return data.data;
};
