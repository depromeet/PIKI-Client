import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';
import type { TournamentStatusT } from '@/types/tournament';

import type { GetTournamentListResponseT } from '../_types/tournament';

export const getTournamentList = async (status?: TournamentStatusT[]) => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetTournamentListResponseT>>(
      ENDPOINTS.TOURNAMENTS,
      { params: { status } }
    );

    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<GetTournamentListResponseT>>(
    ENDPOINTS.TOURNAMENTS,
    { params: { status } }
  );
  return data.data;
};
