import { useMutation } from '@tanstack/react-query';

import { postTournamentItemLink } from '../_apis/postTournamentItemLink';

export const usePostTournamentItemLink = (tournamentId: number) => {
  const { mutate: postTournamentItemLinkMutation, isPending: isPostTournamentItemLinkPending } =
    useMutation({
      mutationFn: (url: string) => postTournamentItemLink(tournamentId, url),
    });

  return { postTournamentItemLinkMutation, isPostTournamentItemLinkPending };
};
