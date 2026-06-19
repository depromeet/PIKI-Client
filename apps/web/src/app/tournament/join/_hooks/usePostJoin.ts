import { useMutation } from '@tanstack/react-query';

import { ANALYTICS_EVENT } from '@/consts/analytics';
import { logAnalyticsEvent } from '@/utils/analytics';

import { postJoin } from '../_apis/postJoin';

export const usePostJoin = () => {
  const { mutate: postJoinMutation, isPending: isPostJoinPending } = useMutation({
    mutationFn: postJoin,
    onSuccess: (_, variables) => {
      logAnalyticsEvent(ANALYTICS_EVENT.FRIEND_JOIN, {
        tournament_id: variables.tournamentId,
        identity: 'member',
      });
    },
  });

  return { postJoinMutation, isPostJoinPending };
};
