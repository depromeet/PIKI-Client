import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostJoinGuestRequestT, PostJoinGuestResponseT } from '../_types/join';

type PostJoinGuestParamsT = {
  tournamentId: number;
  body: PostJoinGuestRequestT;
};

/**
 * 비회원 게스트 토너먼트 참여.
 * 닉네임을 받아 게스트 계정 생성 + 토너먼트 참여를 한 번에 처리.
 * 응답으로 토큰 쌍과 생성된 사용자 정보가 반환된다 (서버는 동시에 HttpOnly 쿠키로도 토큰 발급).
 */
export const postJoinGuest = async ({ tournamentId, body }: PostJoinGuestParamsT) => {
  const { data } = await clientApi.post<ApiResponseT<PostJoinGuestResponseT>>(
    ENDPOINTS.TOURNAMENT_JOIN_GUEST(tournamentId),
    body
  );
  return data.data;
};
