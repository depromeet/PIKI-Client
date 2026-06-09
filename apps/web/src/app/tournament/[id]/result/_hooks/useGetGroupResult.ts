import { useQuery } from '@tanstack/react-query';

import { getGroupResult } from '../_apis/getGroupResult';

export const useGetGroupResult = (tournamentId: number) => {
  const {
    data: groupResultData,
    isPending: isGroupResultPending,
    isError: isGroupResultError,
  } = useQuery({
    queryKey: ['groupResult', tournamentId],
    queryFn: () => getGroupResult(tournamentId),
    retry: false,
  });

  return { groupResultData, isGroupResultPending, isGroupResultError };
};
