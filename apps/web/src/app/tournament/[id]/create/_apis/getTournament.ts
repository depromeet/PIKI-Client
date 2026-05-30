import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { GetTournamentResponseT } from '../_types/tournament';

export const getTournament = async (tournamentId: string) => {
  const { data } = await clientApi.get<ApiResponseT<GetTournamentResponseT>>(
    ENDPOINTS.TOURNAMENT(tournamentId)
  );

  return data.data;
};
