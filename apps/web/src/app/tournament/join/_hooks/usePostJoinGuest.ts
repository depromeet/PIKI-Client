import { useMutation } from '@tanstack/react-query';

import { ANALYTICS_EVENT } from '@/consts/analytics';
import { logAnalyticsEvent } from '@/utils/analytics';

import { postJoinGuest } from '../_apis/postJoinGuest';

export const usePostJoinGuest = () => {
  const { mutateAsync: postJoinGuestMutation, isPending: isPostJoinGuestPending } = useMutation({
    mutationFn: postJoinGuest,
    onSuccess: (_, variables) => {
      logAnalyticsEvent(ANALYTICS_EVENT.FRIEND_JOIN, {
        tournament_id: variables.tournamentId,
        identity: 'guest',
      });
    },
  });

  return { postJoinGuestMutation, isPostJoinGuestPending };
};
