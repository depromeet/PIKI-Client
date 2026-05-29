import { useQuery } from '@tanstack/react-query';
import type { Query } from '@tanstack/react-query';

import type { GetTournamentItemResponseT } from '../_types/tournament';

import { getTournamentItem } from '../_apis/getTournamentItem';

export const useGetTournamentItem = (tournamentId: number, tournamentItemId: number | null) => {
  const { data: tournamentItemData } = useQuery({
    queryKey: ['tournamentItem', tournamentId, tournamentItemId],
    queryFn: () => getTournamentItem(tournamentId, tournamentItemId!),
    enabled: tournamentItemId !== null,
    refetchInterval: (query: Query<GetTournamentItemResponseT>) => {
      if (query.state.data?.status === 'PROCESSING') return 3_000;
      return false;
    },
  });

  return { tournamentItemData };
};
