import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ANALYTICS_EVENT } from '@/consts/analytics';
import { ROUTES } from '@/consts/route';
import { logAnalyticsEvent } from '@/utils/analytics';

import { postTournamentStart } from '../_apis/postTournamentStart';

export const usePostTournamentStart = (tournamentId: number) => {
  const router = useRouter();

  const { mutate: postTournamentStartMutation, isPending: isPostTournamentStartPending } =
    useMutation({
      mutationFn: () => postTournamentStart(tournamentId),
      // 응답의 tournamentId 로 라우팅.
      // - 주최자: ROOT ID (요청 tournamentId 와 동일)
      // - 참여자: 새로 생성된 CLONE ID (이후 본인 인스턴스로 진행)
      onSuccess: ({ tournamentId: nextTournamentId }) => {
        logAnalyticsEvent(ANALYTICS_EVENT.TOURNAMENT_START, {
          tournament_id: nextTournamentId,
          source_tournament_id: tournamentId,
        });
        router.push(ROUTES.TOURNAMENT_LOADING(nextTournamentId));
      },
    });

  return { postTournamentStartMutation, isPostTournamentStartPending };
};
