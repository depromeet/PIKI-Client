import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { postTournamentItemLink } from '../_apis/postTournamentItemLink';
import { useGetTournamentItem } from './useGetTournamentItem';

export const usePostTournamentItemLink = (tournamentId: number) => {
  const queryClient = useQueryClient();
  const [tournamentItemId, setTournamentItemId] = useState<number | null>(null);

  useGetTournamentItem(tournamentId, tournamentItemId);

  const { mutate: postTournamentItemLinkMutation, isPending: isPostTournamentItemLinkPending } =
    useMutation({
      mutationFn: (url: string) => postTournamentItemLink(tournamentId, url),
      onSuccess: ({ tournamentItemId: newItemId }) => {
        queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
        setTournamentItemId(newItemId);
      },
    });

  return { postTournamentItemLinkMutation, isPostTournamentItemLinkPending };
};
