import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

export type PatchInviteExpiryRequestT = {
  /** 새 초대 마감 시각 — 서버는 LocalDateTime 으로 받는다 (예: "2026-06-18T14:30:00"). */
  newExpiresAt: string;
};

export const patchInviteExpiry = async (
  tournamentId: number,
  body: PatchInviteExpiryRequestT
) => {
  const { data } = await clientApi.patch<ApiResponseT<null>>(
    ENDPOINTS.TOURNAMENT_INVITE(tournamentId),
    body
  );

  return data.data;
};
