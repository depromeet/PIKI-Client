import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type {
  PostRecordMatchRequestT,
  PostRecordMatchResponseT,
} from '../../_common/_types/tournamentResponse';

export const postRecordMatch = async (tournamentId: number, body: PostRecordMatchRequestT) => {
  const { data } = await clientApi.post<ApiResponseT<PostRecordMatchResponseT>>(
    ENDPOINTS.TOURNAMENT_MATCHES(tournamentId),
    body
  );
  return data.data;
};
