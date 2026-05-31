import { useSuspenseQuery } from '@tanstack/react-query';

import { getTournament } from '../_apis/getTournament';

export const useGetTournament = (tournamentId: number) => {
  const { data: tournamentData } = useSuspenseQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: () => getTournament(tournamentId),
    refetchInterval: 30_000,
  });

  return { tournamentData };
};
