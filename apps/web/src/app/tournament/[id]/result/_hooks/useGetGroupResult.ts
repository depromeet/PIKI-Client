import { useQuery } from '@tanstack/react-query';

import { getGroupResult } from '../_apis/getGroupResult';

type UseGetGroupResultOptionsT = {
  /** false 면 fetch 안 함 (모달 열릴 때만 호출하고 싶을 때 등) */
  enabled?: boolean;
};

export const useGetGroupResult = (
  tournamentId: number,
  { enabled = true }: UseGetGroupResultOptionsT = {}
) => {
  const {
    data: groupResultData,
    isPending: isGroupResultPending,
    isError: isGroupResultError,
  } = useQuery({
    queryKey: ['groupResult', tournamentId],
    queryFn: () => getGroupResult(tournamentId),
    retry: false,
    enabled,
  });

  return { groupResultData, isGroupResultPending, isGroupResultError };
};
