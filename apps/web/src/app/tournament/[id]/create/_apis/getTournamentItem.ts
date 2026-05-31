import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { GetTournamentItemResponseT } from '../_types/tournament';

export const getTournamentItem = async (tournamentId: number, tournamentItemId: number) => {
  const { data } = await clientApi.get<ApiResponseT<GetTournamentItemResponseT>>(
    ENDPOINTS.TOURNAMENT_ITEM(tournamentId, tournamentItemId)
  );

  return data.data;
};
