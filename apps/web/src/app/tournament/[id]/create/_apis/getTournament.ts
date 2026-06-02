import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';
import { MOCK_TOURNAMENT_PARTICIPANTS } from '@/mocks/participants';
import type { ApiResponseT } from '@/types/api';

import type { GetTournamentResponseT } from '../_types/tournament';

/**
 * 친구 여부 판단용 mock 머지.
 * 서버가 본인 1명만 채워서 보내는 단계라, UI 검증을 위해
 * participants가 2명 미만이면 mock으로 덮어쓴다.
 * API가 친구 정보까지 정상 반환하면 제거.
 */
const withMockParticipants = (data: GetTournamentResponseT): GetTournamentResponseT => {
  if (!data.pending) return data;
  if (data.pending.participants && data.pending.participants.length >= 2) return data;
  return {
    ...data,
    pending: { ...data.pending, participants: MOCK_TOURNAMENT_PARTICIPANTS },
  };
};

export const getTournament = async (tournamentId: number) => {
  const id = Number(tournamentId);

  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetTournamentResponseT>>(
      ENDPOINTS.TOURNAMENT(id)
    );

    return withMockParticipants(data.data);
  }

  const { data } = await clientApi.get<ApiResponseT<GetTournamentResponseT>>(
    ENDPOINTS.TOURNAMENT(id)
  );

  return withMockParticipants(data.data);
};
