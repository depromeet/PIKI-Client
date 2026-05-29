import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostTournamentItemLinkResponseT } from '../_types/tournament';

export const postTournamentItemLink = async (tournamentId: number, url: string) => {
  const { data } = await clientApi.post<ApiResponseT<PostTournamentItemLinkResponseT>>(
    ENDPOINTS.TOURNAMENT_ITEM_LINK(Number(tournamentId)),
    { url }
  );

  return data.data;
};
