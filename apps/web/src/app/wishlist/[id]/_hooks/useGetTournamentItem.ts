import { useSuspenseQuery } from '@tanstack/react-query';

import { getTournamentItem } from '../_apis/getTournamentItem';

export const useGetTournamentItem = (tournamentId: number, tournamentItemId: number) => {
  const { data: tournamentItemData } = useSuspenseQuery({
    queryKey: ['tournamentItem', tournamentId, tournamentItemId],
    queryFn: () => getTournamentItem(tournamentId, tournamentItemId),
  });

  return { tournamentItemData };
};
