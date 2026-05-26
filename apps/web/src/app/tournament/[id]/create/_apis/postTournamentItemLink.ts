import { clientApi } from '@/apis/client';
import { END_POINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { TournamentItemLinkDataT } from '../_types/tournament';

export const postTournamentItemLink = async (tournamentId: string, url: string) => {
  const { data } = await clientApi.post<ApiResponseT<TournamentItemLinkDataT>>(
    END_POINTS.TOURNAMENT_ITEM_LINK(tournamentId),
    { url }
  );

  return data.data;
};
