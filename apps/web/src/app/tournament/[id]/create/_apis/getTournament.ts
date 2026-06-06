import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { GetTournamentResponseT } from '../_types/tournament';

export const getTournament = async (tournamentId: number) => {
  const id = Number(tournamentId);

  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetTournamentResponseT>>(
      ENDPOINTS.TOURNAMENT(id)
    );

    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<GetTournamentResponseT>>(
    ENDPOINTS.TOURNAMENT(id)
  );

  return data.data;
};
