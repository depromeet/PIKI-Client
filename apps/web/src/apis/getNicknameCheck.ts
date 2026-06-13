import { environmentManager } from '@tanstack/react-query';

import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';
import type { GetNicknameCheckResponseT } from '@/types/user';

import { clientApi } from './client';
import { serverApi } from './server';

/**
 * 닉네임 중복 체크.
 * 본인의 현재 닉네임은 서버가 자동으로 통과시킨다 (재확인 흐름 호환).
 */
export const getNicknameCheck = async (nickname: string) => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetNicknameCheckResponseT>>(
      ENDPOINTS.USERS_NICKNAME_CHECK,
      { params: { nickname } }
    );
    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<GetNicknameCheckResponseT>>(
    ENDPOINTS.USERS_NICKNAME_CHECK,
    { params: { nickname } }
  );
  return data.data;
};
