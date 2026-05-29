import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

import type { PostStartTournamentResponseT } from '../_types/tournamentResponse';

export const postStartTournament = async (tournamentId: number) => {
  const { data } = await clientApi.post<ApiResponseT<PostStartTournamentResponseT>>(
    `/api/v1/tournaments/${tournamentId}/start`
  );
  return data.data;
};
