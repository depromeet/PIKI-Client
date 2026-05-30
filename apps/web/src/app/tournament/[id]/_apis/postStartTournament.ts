import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostStartTournamentResponseT } from '../_common/_types/tournamentResponse';

export const postStartTournament = async (tournamentId: number) => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.post<ApiResponseT<PostStartTournamentResponseT>>(
      ENDPOINTS.TOURNAMENT_START(tournamentId)
    );
    return data.data;
  }

  const { data } = await clientApi.post<ApiResponseT<PostStartTournamentResponseT>>(
    ENDPOINTS.TOURNAMENT_START(tournamentId)
  );
  return data.data;
};
