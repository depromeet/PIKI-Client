'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { TournamentItemT } from '@/types/tournament';

import { getTournament } from '../_apis/getTournament';
import { type TransitionStageT, getRoundLabel, getTransitionStage } from '../_consts/rounds';
import type {
  GetTournamentCompletedResponseT,
  GetTournamentInProgressResponseT,
} from '../_types/tournamentResponse';
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
      const completed: GetTournamentCompletedResponseT = {
        tournamentId,
        name: tournamentName,
        status: 'COMPLETED',
        completed: { result: data.result },
      };
      queryClient.setQueryData(['tournament', tournamentId], completed);
    },
  });

  // 서버 권위의 현재 라운드 (2, 4, 8, ...) — 라운드 종료 시 refetch로 갱신
  const [currentRound, setCurrentRound] = useState(inProgress.currentRound);
  // 현재 라운드 진행 중 남은 미대결 아이템 (매치 끝날 때마다 두 아이템씩 빠짐)
  const [remainingItems, setRemainingItems] = useState<TournamentItemT[]>(
    inProgress.remainingItems
  );
  const [transitionStage, setTransitionStage] = useState<TransitionStageT | null>(null);

  // 페어 생성 + 셔플 (remainingItems가 바뀔 때마다 — 매치 끝나면 다음 페어가 자동 노출)
  const pairs = useMemo(() => shufflePairs(pairByPriceAsc(remainingItems)), [remainingItems]);
  const currentMatch = pairs[0];
  // 현재 라운드 전체 매치 수 = currentRound / 2
  // 진행한 매치 수 = (currentRound - remainingItems.length) / 2
  const matchIndex = (currentRound - remainingItems.length) / 2;
  const roundLabel = getRoundLabel(currentRound, matchIndex);
  const isFinalRound = currentRound === 2;
  const isLastMatchInRound = pairs.length === 1;

  const advanceToNextRound = async () => {
    // 라운드 종료 후 서버에서 다음 라운드 정보 가져오기
    const next = await queryClient.fetchQuery({
      queryKey: ['tournament', tournamentId],
      queryFn: () => getTournament(tournamentId),
    });

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
        onSuccess: () => router.push(`/tournament/${tournamentId}/result`),
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

    // 라운드 마지막 매치 → 전환 화면 노출
    if (isLastMatchInRound) {
      const nextRoundItemCount = currentRound / 2;
      setTransitionStage(getTransitionStage(nextRoundItemCount));
    }
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
