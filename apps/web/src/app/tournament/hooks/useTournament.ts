'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { MOCK_PRODUCTS } from '@/mocks/products';
import { writeResult } from '@/utils/resultStorage';

import { LOSER_RANKS, NEXT_SLOT, ROUND_LABELS } from '../consts/rounds';
import type { MatchPairT, ProductT, RankedProductT } from '../types/tournamentTypes';

const FINAL_MATCH_INDEX = 6;

const buildInitialMatches = (seeded: ProductT[]): Array<MatchPairT | null> => {
  if (seeded.length < 8) {
    return [null, null, null, null, null, null, null];
  }
  return [
    [seeded[0]!, seeded[1]!],
    [seeded[2]!, seeded[3]!],
    [seeded[4]!, seeded[5]!],
    [seeded[6]!, seeded[7]!],
    null,
    null,
    null,
  ];
};

const useTournament = () => {
  const router = useRouter();
  const [products] = useState<ProductT[]>(() => MOCK_PRODUCTS.slice(0, 8));
  const [matchIndex, setMatchIndex] = useState(0);
  const [matches, setMatches] = useState<Array<MatchPairT | null>>(() =>
    buildInitialMatches(products)
  );

  const rankedRef = useRef<RankedProductT[]>([]);
  const pendingRef = useRef<Partial<Record<number, { left?: ProductT; right?: ProductT }>>>({});

  const currentMatch = matches[matchIndex];
  const roundLabel = ROUND_LABELS[matchIndex] ?? '';

  const handleSelect = (winner: ProductT) => {
    const currentPair = matches[matchIndex];
    if (!currentPair) return;

    const loser = winner === currentPair[0] ? currentPair[1] : currentPair[0];
    rankedRef.current = [...rankedRef.current, { ...loser, rank: LOSER_RANKS[matchIndex]! }];

    if (matchIndex === FINAL_MATCH_INDEX) {
      const finalRanked: RankedProductT[] = [...rankedRef.current, { ...winner, rank: 1 }].sort(
        (a, b) => a.rank - b.rank
      );
      writeResult(finalRanked);
      router.push('/tournament/result');
      return;
    }

    const nextSlot = NEXT_SLOT[matchIndex];
    if (nextSlot) {
      const pending = pendingRef.current[nextSlot.matchIdx] ?? {};
      pending[nextSlot.side] = winner;
      pendingRef.current[nextSlot.matchIdx] = pending;

      if (pending.left && pending.right) {
        const pair: MatchPairT = [pending.left, pending.right];
        setMatches(prev => {
          const next = [...prev];
          next[nextSlot.matchIdx] = pair;
          return next;
        });
      }
    }

    setMatchIndex(prev => prev + 1);
  };

  return {
    products,
    currentMatch,
    roundLabel,
    handleSelect,
  };
};

export default useTournament;
