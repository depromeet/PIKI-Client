import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostStartTournamentResponseT } from '../_types/tournamentResponse';

export const postStartTournament = async (tournamentId: number) => {
  const { data } = await clientApi.post<ApiResponseT<PostStartTournamentResponseT>>(
    ENDPOINTS.TOURNAMENT_START(tournamentId)
  );
  return data.data;
};
