import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

import type { PostRecordMatchRequestT } from '../_types/tournamentResponse';

export const postRecordMatch = async (
  tournamentId: number,
  body: PostRecordMatchRequestT
) => {
  const { data } = await clientApi.post<ApiResponseT<null>>(
    `/api/v1/tournaments/${tournamentId}/matches`,
    body
  );
  return data.data;
};
