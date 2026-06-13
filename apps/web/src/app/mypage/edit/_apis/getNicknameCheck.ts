import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

export const getNicknameCheck = async (nickname: string) => {
  const { data } = await clientApi.get<ApiResponseT<{ available: boolean }>>(
    ENDPOINTS.USER_NICKNAME_CHECK,
    { params: { nickname } }
  );

  return { available: data.data.available, detail: data.detail };
};
