import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

export const deleteTournamentItem = async (tournamentId: number, tournamentItemId: number) => {
  const { data } = await clientApi.delete<ApiResponseT<null>>(
    ENDPOINTS.TOURNAMENT_ITEM(tournamentId, tournamentItemId)
  );

  return data.data;
};
