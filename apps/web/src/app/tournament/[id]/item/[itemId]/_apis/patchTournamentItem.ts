import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PatchTournamentItemResponseT } from '../_types/tournamentItem';

export const patchTournamentItem = async (
  tournamentId: number,
  tournamentItemId: number,
  formData: FormData
) => {
  const { data } = await clientApi.patch<ApiResponseT<PatchTournamentItemResponseT>>(
    ENDPOINTS.TOURNAMENT_ITEM(tournamentId, tournamentItemId),
    formData
  );

  return data.data;
};
