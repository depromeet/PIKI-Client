'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { MOCK_PRODUCTS } from '@/mocks/products';
import { writeResult } from '@/utils/resultStorage';

import { type TransitionStageT, getRoundLabel, getTransitionStage } from '../_consts/rounds';
import type { MatchPairT, ProductT, RankedProductT } from '../_types/tournament';

// 참가자 수는 2의 거듭제곱이어야 함 (2, 4, 8, 16, 32)
const INITIAL_PARTICIPANT_COUNT = 8;

const buildPairsFromItems = (items: ProductT[]): MatchPairT[] => {
  const pairs: MatchPairT[] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push([items[i]!, items[i + 1]!]);
  }
  return pairs;
};

const useTournament = () => {
  const router = useRouter();
  const [currentRoundItems, setCurrentRoundItems] = useState<ProductT[]>(() =>
    MOCK_PRODUCTS.slice(0, INITIAL_PARTICIPANT_COUNT)
  );
  const [matchIndex, setMatchIndex] = useState(0);
  const [transitionStage, setTransitionStage] = useState<TransitionStageT | null>(null);

  const winnersRef = useRef<ProductT[]>([]);
  const rankedRef = useRef<RankedProductT[]>([]);

  const roundItemCount = currentRoundItems.length;
  const totalMatchesInRound = roundItemCount / 2;
  const matches = buildPairsFromItems(currentRoundItems);
  const currentMatch = matches[matchIndex];
  const roundLabel = getRoundLabel(roundItemCount, matchIndex);
  const isFinalRound = roundItemCount === 2;

  const handleSelect = (winner: ProductT) => {
    const currentPair = matches[matchIndex];
    if (!currentPair) return;

    const loser = winner === currentPair[0] ? currentPair[1] : currentPair[0];
    // 같은 라운드에서 패배한 아이템은 모두 같은 등수대로 묶음 (결승만 별도 처리)
    const loserRank = isFinalRound ? 2 : roundItemCount;
    rankedRef.current = [...rankedRef.current, { ...loser, rank: loserRank }];
    winnersRef.current = [...winnersRef.current, winner];

    // 결승전 종료 → 결과 페이지
    if (isFinalRound) {
      const finalRanked: RankedProductT[] = [...rankedRef.current, { ...winner, rank: 1 }].sort(
        (a, b) => a.rank - b.rank
      );
      writeResult(finalRanked);
      router.push('/tournament/result');
      return;
    }

    // 라운드 중간 매치 → 다음 매치로
    if (matchIndex < totalMatchesInRound - 1) {
      setMatchIndex(prev => prev + 1);
      return;
    }

    // 라운드 마지막 매치 → 전환 화면 노출
    const nextRoundItemCount = roundItemCount / 2;
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
