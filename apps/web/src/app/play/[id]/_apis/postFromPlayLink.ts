import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostFromPlayLinkResponseT } from '../_types/play';

/**
 * 플레이 링크로 토너먼트 복제 생성.
 * 호출자가 새 토너먼트의 소유자가 되며, 같은 아이템 구성으로 PENDING 상태로 시작된다.
 *
 * 에러 코드:
 * - 401: 미인증 — 클라에서 게스트 자동 발급 후 재시도
 * - 404: 원본 토너먼트 없음 또는 플레이 링크 미생성
 * - 409: 플레이 링크 만료 또는 이미 동일 링크로 토너먼트 생성한 경우
 */
export const postFromPlayLink = async (sourceTournamentId: number) => {
  const { data } = await clientApi.post<ApiResponseT<PostFromPlayLinkResponseT>>(
    ENDPOINTS.TOURNAMENT_FROM_PLAY_LINK(sourceTournamentId),
    {}
  );
  return data.data;
};
