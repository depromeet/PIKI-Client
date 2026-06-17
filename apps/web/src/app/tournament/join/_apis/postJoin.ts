import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostJoinRequestT } from '../_types/join';

type PostJoinParamsT = {
  tournamentId: number;
  body: PostJoinRequestT;
};

/** 이미 인증된 게스트/회원의 토너먼트 참여 */
export const postJoin = async ({ tournamentId, body }: PostJoinParamsT) => {
  const { data } = await clientApi.post<ApiResponseT<{ tournamentId: number }>>(
    ENDPOINTS.TOURNAMENT_JOIN(tournamentId),
    body
  );

  return data.data;
};
