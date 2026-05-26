import { useMutation } from '@tanstack/react-query';

import { postTournamentItemLink } from '../_apis/postTournamentItemLink';

export const usePostTournamentItemLink = (tournamentId: string) => {
  const { mutate: postItemLink, isPending } = useMutation({
    mutationFn: (url: string) => postTournamentItemLink(tournamentId, url),
  });

  return { postItemLink, isPending };
};
