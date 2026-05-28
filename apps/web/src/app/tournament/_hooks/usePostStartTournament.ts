import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postStartTournament } from '../_apis/postStartTournament';

export const usePostStartTournament = (tournamentId: number) => {
  const queryClient = useQueryClient();

  const { mutate: postStartTournamentMutation, isPending: isPostStartTournamentPending } =
    useMutation({
      mutationFn: () => postStartTournament(tournamentId),
      onSuccess: () => {
        // 시작하면 상태가 PENDING → IN_PROGRESS로 바뀌므로 단건 조회 invalidate
        queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
      },
    });

  return { postStartTournamentMutation, isPostStartTournamentPending };
};
