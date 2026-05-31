import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

type PostTournamentItemsByWishRequestT = {
  itemIds: number[];
};

type PostTournamentItemsByWishResponseT = {
  tournamentItemIds: number[];
};

export const postTournamentItemsByWish = async (
  tournamentId: number,
  body: PostTournamentItemsByWishRequestT
) => {
  const { data } = await clientApi.post<ApiResponseT<PostTournamentItemsByWishResponseT>>(
    ENDPOINTS.TOURNAMENT_ITEMS_FROM_WISH(tournamentId),
    body
  );

  return data.data;
};
