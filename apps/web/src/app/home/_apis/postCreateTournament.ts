import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

import type {
  PostCreateTournamentRequestT,
  PostCreateTournamentResponseT,
} from '../_types/tournament';

export const postCreateTournament = async (body: PostCreateTournamentRequestT) => {
  const { data } = await clientApi.post<ApiResponseT<PostCreateTournamentResponseT>>(
    '/api/v1/tournaments',
    body
  );

  return data.data;
};
