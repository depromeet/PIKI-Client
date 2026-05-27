import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import type { ApiResponseT } from '@/types/api';

import type { GetTournamentResponseT } from '../_types/tournamentResponse';

export const getTournament = async (tournamentId: number) => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetTournamentResponseT>>(
      `/api/v1/tournaments/${tournamentId}`
    );
    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<GetTournamentResponseT>>(
    `/api/v1/tournaments/${tournamentId}`
  );
  return data.data;
};
