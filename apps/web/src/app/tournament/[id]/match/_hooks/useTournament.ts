'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useSyncExternalStore } from 'react';

import { ROUTES } from '@/consts/route';
import type { TournamentItemT } from '@/types/tournament';

import { getTournament } from '../../_common/_apis/getTournament';
import type {
  GetTournamentCompletedResponseT,
  GetTournamentInProgressResponseT,
} from '../../_common/_types/tournamentResponse';
import { type TransitionStageT, getRoundLabel, getTransitionStage } from '../_consts/rounds';
import { pairByPriceAsc, shufflePairs } from '../_utils/pairItems';
import { usePostRecordMatch } from './usePostRecordMatch';

type UseTournamentArgs = {
  tournamentId: number;
  tournamentName: string;
  inProgress: GetTournamentInProgressResponseT['inProgress'];
};

const useTournament = ({ tournamentId, tournamentName, inProgress }: UseTournamentArgs) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { postRecordMatchMutation } = usePostRecordMatch({
    tournamentId,
    onSuccess: data => {
      // 결승 응답에 포함된 result로 결과 페이지의 GET을 건너뛰도록 캐시 선갱신
      if (!data) return;
      queryClient.setQueryData<GetTournamentCompletedResponseT>(
        ['tournament', tournamentId],
        prev => ({
          tournamentId,
          name: tournamentName,
          // 직전 캐시(GET 응답)의 isOwner를 그대로 승계 — 알 수 없으면 false
          isOwner: prev?.isOwner ?? false,
          status: 'COMPLETED',
          completed: { result: data.result },
        })
      );
    },
  });

  // 서버 권위의 현재 라운드 (2, 4, 8, ...) — 라운드 종료 시 refetch로 갱신
  const [currentRound, setCurrentRound] = useState(inProgress.currentRound);
  // 현재 라운드 진행 중 남은 미대결 아이템 (매치 끝날 때마다 두 아이템씩 빠짐)
  const [remainingItems, setRemainingItems] = useState<TournamentItemT[]>(
    inProgress.remainingItems
  );
  const [transitionStage, setTransitionStage] = useState<TransitionStageT | null>(null);
  // SSR과 클라이언트 첫 렌더에서 동일한 페어 순서를 보장하기 위해, 마운트 후에만 셔플 적용
  // (Math.random 결과가 SSR/CSR 간 달라 hydration mismatch 발생)
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // 페어 생성 — SSR/첫 렌더: 가격 오름차순 그대로, 마운트 후: 셔플 적용
  const pairs = useMemo(() => {
    const sorted = pairByPriceAsc(remainingItems);
    return isMounted ? shufflePairs(sorted) : sorted;
  }, [remainingItems, isMounted]);
  const currentMatch = pairs[0];
  // 현재 라운드 전체 매치 수 = currentRound / 2
  // 진행한 매치 수 = (currentRound - remainingItems.length) / 2
  const matchIndex = (currentRound - remainingItems.length) / 2;
  const roundLabel = getRoundLabel(currentRound, matchIndex);
  const isFinalRound = currentRound === 2;
  const isLastMatchInRound = pairs.length === 1;

  const advanceToNextRound = async () => {
    // 라운드 종료 후 서버에서 다음 라운드 정보 가져오기
    // queryClient.fetchQuery는 setQueryData로 시드된 캐시를 반환할 수 있어 직접 fetch
    const next = await getTournament(tournamentId);
    queryClient.setQueryData(['tournament', tournamentId], next);

    if (next.status !== 'IN_PROGRESS') return;
    setCurrentRound(next.inProgress.currentRound);
    setRemainingItems(next.inProgress.remainingItems);
  };

  const handleSelect = (winner: TournamentItemT) => {
    if (!currentMatch) return;

    const [first, second] = currentMatch;

    const matchBody = {
      currentRound,
      firstTournamentItemId: first.tournamentItemId,
      secondTournamentItemId: second.tournamentItemId,
      selectedTournamentItemId: winner.tournamentItemId,
    };

    // 결승전 — onSuccess(캐시를 COMPLETED로 시드)까지 기다린 후 결과 페이지로 이동
    if (isFinalRound) {
      postRecordMatchMutation(matchBody, {
        onSuccess: () => router.push(ROUTES.TOURNAMENT_RESULT(tournamentId)),
      });
      return;
    }

    // 라운드 마지막 매치 → POST 응답 기다린 후 전환 화면 노출
    // (응답 안 기다리고 advance 시 서버가 아직 다음 라운드로 전환 못해 같은 라운드 다시 받는 race 방지)
    if (isLastMatchInRound) {
      postRecordMatchMutation(matchBody, {
        onSuccess: () => {
          const nextRoundItemCount = currentRound / 2;
          setTransitionStage(getTransitionStage(nextRoundItemCount));
        },
      });
      return;
    }

    // 일반 라운드 — 낙관적 진행 (성공/실패와 무관하게 다음 매치로)
    postRecordMatchMutation(matchBody);

    // 현재 매치 페어를 remainingItems에서 제거 (서버 동작과 동일)
    setRemainingItems(prev =>
      prev.filter(
        item =>
          item.tournamentItemId !== first.tournamentItemId &&
          item.tournamentItemId !== second.tournamentItemId
      )
    );
  };

  const handleTransitionComplete = async () => {
    await advanceToNextRound();
    setTransitionStage(null);
  };

  return {
    currentMatch,
    roundLabel,
    isFinalRound,
    transitionStage,
    handleSelect,
    handleTransitionComplete,
  };
};

export default useTournament;
