import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/consts/route';

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
        router.push(ROUTES.TOURNAMENT_MATCH(nextTournamentId));
      },
    });

  return { postTournamentStartMutation, isPostTournamentStartPending };
};
