import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PostPlayLinkResponseT } from '../../_common/_types/tournamentResponse';

/**
 * 플레이 링크 생성/갱신 (소유자 전용).
 * 응답으로 `playLinkExpiresAt` (ISO datetime 문자열) 만 반환.
 * 실제 공유 URL 은 클라이언트에서 `tournamentId` 기반으로 구성한다.
 */
export const postPlayLink = async (tournamentId: number) => {
  const { data } = await clientApi.post<ApiResponseT<PostPlayLinkResponseT>>(
    ENDPOINTS.TOURNAMENT_PLAY_LINK(tournamentId)
  );
  return data.data;
};
