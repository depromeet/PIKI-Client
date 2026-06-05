import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/consts/route';

import { postTournamentStart } from '../_apis/postTournamentStart';

export const usePostTournamentStart = (tournamentId: number) => {
  const router = useRouter();

  const { mutate: postTournamentStartMutation, isPending: isPostTournamentStartPending } =
    useMutation({
      mutationFn: () => postTournamentStart(tournamentId),
      onSuccess: () => {
        router.push(ROUTES.TOURNAMENT_MATCH(tournamentId));
      },
    });

  return { postTournamentStartMutation, isPostTournamentStartPending };
};
