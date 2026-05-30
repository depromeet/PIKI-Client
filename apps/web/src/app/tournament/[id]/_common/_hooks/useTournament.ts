'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

import type { TournamentItemT } from '@/types/tournament';

import { type TransitionStageT, getRoundLabel, getTransitionStage } from '../_consts/rounds';
import type { GetTournamentCompletedResponseT } from '../_types/tournamentResponse';
import { pairByPriceAsc, shufflePairs } from '../_utils/pairItems';
import { usePostRecordMatch } from './usePostRecordMatch';

type UseTournamentArgs = {
  tournamentId: number;
  initialItems: TournamentItemT[];
  tournamentName: string;
};

const useTournament = ({ tournamentId, initialItems, tournamentName }: UseTournamentArgs) => {
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

  // 현재 라운드 진행 중인 아이템 (가격 오름차순 정렬되어 페어로 묶임)
  const [currentRoundItems, setCurrentRoundItems] = useState<TournamentItemT[]>(initialItems);
  const [matchIndex, setMatchIndex] = useState(0);
  const [transitionStage, setTransitionStage] = useState<TransitionStageT | null>(null);

  // 라운드 내 승자 누적 (다음 라운드 진출자)
  const winnersRef = useRef<TournamentItemT[]>([]);

  // 라운드 시작 시 한 번만 페어 생성 + 셔플 (매치 진행 중 순서가 바뀌지 않도록)
  const pairs = useMemo(() => shufflePairs(pairByPriceAsc(currentRoundItems)), [currentRoundItems]);
  const totalMatchesInRound = pairs.length;
  const currentRound = currentRoundItems.length; // API의 currentRound와 동일 의미 (2, 4, 8, ...)
  const currentMatch = pairs[matchIndex];
  const roundLabel = getRoundLabel(currentRound, matchIndex);
  const isFinalRound = currentRound === 2;

  const handleSelect = (winner: TournamentItemT) => {
    const currentPair = pairs[matchIndex];
    if (!currentPair) return;

    const [first, second] = currentPair;
    const selectedIsFirst = winner.tournamentItemId === first.tournamentItemId;
    const selectedTournamentItemId = winner.tournamentItemId;

    winnersRef.current = [...winnersRef.current, selectedIsFirst ? first : second];

    const matchBody = {
      currentRound,
      firstTournamentItemId: first.tournamentItemId,
      secondTournamentItemId: second.tournamentItemId,
      selectedTournamentItemId,
    };

    // 결승전 — 서버가 COMPLETED 전환 + result를 응답에 담음
    // onSuccess(훅 onSuccess가 캐시를 COMPLETED로 시드)까지 기다린 후 결과 페이지로 이동
    if (isFinalRound) {
      postRecordMatchMutation(matchBody, {
        onSuccess: () => router.push(`/tournament/${tournamentId}/result`),
      });
      return;
    }

    // 일반 라운드 — 낙관적 진행 (성공/실패와 무관하게 다음 매치로)
    postRecordMatchMutation(matchBody);

    // 라운드 중간 매치 → 다음 매치로
    if (matchIndex < totalMatchesInRound - 1) {
      setMatchIndex(prev => prev + 1);
      return;
    }

    // 라운드 마지막 매치 → 전환 화면 노출
    const nextRoundItemCount = currentRound / 2;
    setTransitionStage(getTransitionStage(nextRoundItemCount));
  };

  const handleTransitionComplete = () => {
    setCurrentRoundItems(winnersRef.current);
    winnersRef.current = [];
    setMatchIndex(0);
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
