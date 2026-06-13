import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { GetGroupResultResponseT } from '../_types/groupResult';

/**
 * 그룹 결과 조회.
 * 완료된 토너먼트 + 플레이 링크로 복제된 모든 토너먼트의 결과를 비교해 rank별 chosenBy 반환.
 *
 * 에러 코드:
 * - 401: 미인증
 * - 403: 토너먼트 참여자가 아님
 * - 404: 토너먼트 없음
 * - 409: COMPLETED가 아닌 토너먼트
 */
export const getGroupResult = async (tournamentId: number) => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetGroupResultResponseT>>(
      ENDPOINTS.TOURNAMENT_GROUP_RESULT(tournamentId)
    );
    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<GetGroupResultResponseT>>(
    ENDPOINTS.TOURNAMENT_GROUP_RESULT(tournamentId)
  );
  return data.data;
};
