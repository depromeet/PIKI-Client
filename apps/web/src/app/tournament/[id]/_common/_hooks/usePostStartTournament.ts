import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postStartTournament } from '../_apis/postStartTournament';
import type { PostStartTournamentResponseT } from '../_types/tournamentResponse';

type UsePostStartTournamentArgs = {
  tournamentId: number;
  onSuccess?: (data: PostStartTournamentResponseT) => void;
};

export const usePostStartTournament = ({ tournamentId, onSuccess }: UsePostStartTournamentArgs) => {
  const queryClient = useQueryClient();

  const { mutate: postStartTournamentMutation, isPending: isPostStartTournamentPending } =
    useMutation({
      mutationFn: () => postStartTournament(tournamentId),
      onSuccess: data => {
        // 시작하면 상태가 PENDING → IN_PROGRESS로 바뀌므로 단건 조회 invalidate
        queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
        onSuccess?.(data);
      },
    });

  return { postStartTournamentMutation, isPostStartTournamentPending };
};
