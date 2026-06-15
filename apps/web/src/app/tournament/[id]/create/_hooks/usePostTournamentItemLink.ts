import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postTournamentItemLink } from '../_apis/postTournamentItemLink';

export const usePostTournamentItemLink = (tournamentId: number) => {
  const queryClient = useQueryClient();

  const { mutate: postTournamentItemLinkMutation, isPending: isPostTournamentItemLinkPending } =
    useMutation({
      mutationFn: (url: string) => postTournamentItemLink(tournamentId, url),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
      },
    });

  return { postTournamentItemLinkMutation, isPostTournamentItemLinkPending };
};
