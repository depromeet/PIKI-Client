import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postTournamentStart } from '../_apis/postTournamentStart';

export const usePostTournamentStart = (tournamentId: string) => {
  const router = useRouter();

  const { mutate: startTournament, isPending } = useMutation({
    mutationFn: () => postTournamentStart(tournamentId),
    onSuccess: () => {
      router.push(`/tournament/${tournamentId}/match`);
    },
  });

  return { startTournament, isPending };
};
