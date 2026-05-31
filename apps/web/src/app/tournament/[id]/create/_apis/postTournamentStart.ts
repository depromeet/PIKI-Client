import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostTournamentStartResponseT } from '../_types/tournament';

export const postTournamentStart = async (tournamentId: string) => {
  const { data } = await clientApi.post<ApiResponseT<PostTournamentStartResponseT>>(
    ENDPOINTS.TOURNAMENT_START(tournamentId)
  );

  return data.data;
};
