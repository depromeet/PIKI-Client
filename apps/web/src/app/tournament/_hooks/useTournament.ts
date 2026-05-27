'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import type { TournamentItemT } from '@/types/tournament';

import { getRoundLabel, getTransitionStage, type TransitionStageT } from '../_consts/rounds';
import { pairByPriceAsc } from '../_utils/pairItems';
import { usePostRecordMatch } from './usePostRecordMatch';

type UseTournamentArgs = {
  tournamentId: number;
  initialItems: TournamentItemT[];
};

const useTournament = ({ tournamentId, initialItems }: UseTournamentArgs) => {
  const router = useRouter();
  const { recordMatch } = usePostRecordMatch(tournamentId);

  // 현재 라운드 진행 중인 아이템 (가격 오름차순 정렬되어 페어로 묶임)
  const [currentRoundItems, setCurrentRoundItems] = useState<TournamentItemT[]>(initialItems);
  const [matchIndex, setMatchIndex] = useState(0);
  const [transitionStage, setTransitionStage] = useState<TransitionStageT | null>(null);

  // 라운드 내 승자 누적 (다음 라운드 진출자)
  const winnersRef = useRef<TournamentItemT[]>([]);

  const pairs = pairByPriceAsc(currentRoundItems);
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

    // 매치 기록 전송 (성공/실패와 무관하게 UI 진행 — 낙관적 갱신)
    recordMatch({
      currentRound,
      firstTournamentItemId: first.tournamentItemId,
      secondTournamentItemId: second.tournamentItemId,
      selectedTournamentItemId,
    });

    winnersRef.current = [...winnersRef.current, selectedIsFirst ? first : second];

    // 결승전 종료 → 결과 페이지
    if (isFinalRound) {
      router.push(`/tournament/result?tournamentId=${tournamentId}`);
      return;
    }

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
