import { useSuspenseQuery } from '@tanstack/react-query';

import type { TournamentStatusT } from '@/types/tournament';

import { getTournamentList } from '../_apis/getTournamentList';

export const useGetTournamentList = (status?: TournamentStatusT[]) => {
  const { data } = useSuspenseQuery({
    queryKey: ['tournamentList', status],
    queryFn: () => getTournamentList(status),
  });

  return { data };
};
