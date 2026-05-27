import { clientApi } from '@/apis/client';
import { END_POINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { TournamentStartDataT } from '../_types/tournament';

export const postTournamentStart = async (tournamentId: string) => {
  const { data } = await clientApi.post<ApiResponseT<TournamentStartDataT>>(
    END_POINTS.TOURNAMENT_START(tournamentId)
  );

  return data.data;
};
