import { useMutation } from '@tanstack/react-query';

import { postPlayLink } from '../_apis/postPlayLink';

export const usePostPlayLink = (tournamentId: number) => {
  const {
    mutateAsync: postPlayLinkMutation,
    isPending: isPostPlayLinkPending,
  } = useMutation({
    mutationFn: () => postPlayLink(tournamentId),
  });

  return { postPlayLinkMutation, isPostPlayLinkPending };
};
