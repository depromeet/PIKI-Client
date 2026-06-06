import { useSuspenseQuery } from '@tanstack/react-query';

import { getGroupResult } from '../_apis/getGroupResult';

export const useGetGroupResult = (tournamentId: number) => {
  const { data: groupResultData } = useSuspenseQuery({
    queryKey: ['groupResult', tournamentId],
    queryFn: () => getGroupResult(tournamentId),
  });

  return { groupResultData };
};
