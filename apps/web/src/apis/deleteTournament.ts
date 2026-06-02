import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

export const deleteTournament = async (tournamentId: number) => {
  const { data } = await clientApi.delete<ApiResponseT<null>>(ENDPOINTS.TOURNAMENT(tournamentId));

  return data.data;
};
