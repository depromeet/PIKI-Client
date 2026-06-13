import { useSuspenseQuery } from '@tanstack/react-query';

import { getTournament } from '../_apis/getTournament';

export const useGetTournament = (tournamentId: number) => {
  const { data: tournamentData } = useSuspenseQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: () => getTournament(tournamentId),
    // 참여자(isOwner=false)는 주최자가 ROOT 를 시작(`ownerStarted=true`) 했는지 감지하려고 주기적으로 polling.
    // 주최자/완료 화면에선 사실상 무해 (focus refetch 도 함께 동작).
    refetchInterval: 30_000,
  });

  return { tournamentData };
};
