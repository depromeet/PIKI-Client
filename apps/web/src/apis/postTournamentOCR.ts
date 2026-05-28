import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';
import type { PostTournamentOCRResponseT } from '@/types/tournament';

import { clientApi } from './client';

export const postTournamentOCR = async (tournamentId: number, formData: FormData) => {
  const { data } = await clientApi.post<ApiResponseT<PostTournamentOCRResponseT>>(
    ENDPOINTS.TOURNAMENT_OCR(tournamentId),
    formData
  );

  return data.data;
};
