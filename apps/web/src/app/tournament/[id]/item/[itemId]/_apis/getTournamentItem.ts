import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { GetTournamentItemResponseT } from '../_types/tournamentItem';

export const getTournamentItem = async (tournamentId: number, tournamentItemId: number) => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetTournamentItemResponseT>>(
      ENDPOINTS.TOURNAMENT_ITEM(tournamentId, tournamentItemId)
    );
    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<GetTournamentItemResponseT>>(
    ENDPOINTS.TOURNAMENT_ITEM(tournamentId, tournamentItemId)
  );

  return data.data;
};
