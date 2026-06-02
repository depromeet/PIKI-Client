import { useSuspenseQuery } from '@tanstack/react-query';

import { getTournamentList } from '@/apis/getTournamentList';
import type { TournamentStatusT } from '@/types/tournament';

export const useGetTournamentList = (status: TournamentStatusT[] = []) => {
  const { data: tournamentListData } = useSuspenseQuery({
    queryKey: ['tournamentList', status],
    queryFn: () => getTournamentList(status),
  });

  return { tournamentListData };
};
