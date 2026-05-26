import { clientApi } from '@/apis/client';
import { END_POINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { TournamentDataT } from '../_types/tournament';

export const getTournament = async (tournamentId: string) => {
  const { data } = await clientApi.get<ApiResponseT<TournamentDataT>>(
    END_POINTS.TOURNAMENT(tournamentId)
  );

  return data.data;
};
