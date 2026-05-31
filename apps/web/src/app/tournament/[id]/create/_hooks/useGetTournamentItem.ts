import type { Query } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getTournamentItem } from '../_apis/getTournamentItem';
import type { GetTournamentItemResponseT } from '../_types/tournament';

export const useGetTournamentItem = (tournamentId: number, tournamentItemId: number | null) => {
  const queryClient = useQueryClient();

  const { data: tournamentItemData } = useQuery({
    queryKey: ['tournamentItem', tournamentId, tournamentItemId],
    queryFn: () => getTournamentItem(tournamentId, tournamentItemId!),
    enabled: tournamentItemId !== null,
    refetchInterval: (query: Query<GetTournamentItemResponseT>) => {
      if (query.state.data?.status === 'READY' || query.state.data?.status === 'FAILED') {
        queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
        return false;
      }
      if (query.state.data?.status === 'PROCESSING') return 3_000;
      return false;
    },
  });

  return { tournamentItemData };
};
