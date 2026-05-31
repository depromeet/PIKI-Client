import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postTournamentStart } from '../_apis/postTournamentStart';

export const usePostTournamentStart = (tournamentId: number) => {
  const router = useRouter();

  const { mutate: postTournamentStartMutation, isPending: isPostTournamentStartPending } =
    useMutation({
      mutationFn: () => postTournamentStart(tournamentId),
      onSuccess: () => {
        router.push(`/tournament/${tournamentId}/match`);
      },
    });

  return { postTournamentStartMutation, isPostTournamentStartPending };
};
