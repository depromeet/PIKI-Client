import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ANALYTICS_EVENT } from '@/consts/analytics';
import { logAnalyticsEvent } from '@/utils/analytics';

import { type PatchInviteExpiryRequestT, patchInviteExpiry } from '../_apis/patchInviteExpiry';

export const usePatchInviteExpiry = (tournamentId: number) => {
  const queryClient = useQueryClient();

  const { mutate: patchInviteExpiryMutation, isPending: isPatchInviteExpiryPending } = useMutation({
    mutationFn: (body: PatchInviteExpiryRequestT) => patchInviteExpiry(tournamentId, body),
    onSuccess: () => {
      logAnalyticsEvent(ANALYTICS_EVENT.INVITE_EXPIRY_CHANGE, { tournament_id: tournamentId });
      // 토너먼트 단건 조회 캐시 무효화 → 시트의 마감 시각 갱신.
      queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
    },
  });

  return { patchInviteExpiryMutation, isPatchInviteExpiryPending };
};
