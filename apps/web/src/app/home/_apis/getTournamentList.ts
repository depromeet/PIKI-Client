import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import type { ApiResponseT } from '@/types/api';
import type { TournamentStatusT } from '@/types/tournament';

import type { GetTournamentListResponseT } from '../_types/tournament';

export const getTournamentList = async (status?: TournamentStatusT[]) => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetTournamentListResponseT>>(
      '/api/v1/tournaments',
      { params: { status } }
    );

    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<GetTournamentListResponseT>>(
    '/api/v1/tournaments',
    { params: { status } }
  );
  return data.data;
};
