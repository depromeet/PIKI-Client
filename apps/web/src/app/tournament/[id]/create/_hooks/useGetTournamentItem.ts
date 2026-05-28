import { useSuspenseQuery } from '@tanstack/react-query';

import { getTournamentItem } from '../_apis/getTournamentItem';

export const useGetTournamentItem = (tournamentId: number, tournamentItemId: number) => {
  const { data: tournamentItemData } = useSuspenseQuery({
    queryKey: ['tournamentItem', tournamentId, tournamentItemId],
    queryFn: () => getTournamentItem(tournamentId, tournamentItemId),
    refetchInterval: query => {
      if (query.state.data?.status === 'PROCESSING') return 3_000;
      return false;
    },
  });

  return { tournamentItemData };
};
