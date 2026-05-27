import type { ApiResponseT } from '@/types/api';
import type { PostTournamentOCRResponseT } from '@/types/tournament';

import { clientApi } from './client';

export const postTournamentOCR = async (tournamentId: number, formData: FormData) => {
  const { data } = await clientApi.post<ApiResponseT<PostTournamentOCRResponseT>>(
    `/api/v1/tournaments/${tournamentId}/items/images`,
    formData
  );

  return data.data;
};
