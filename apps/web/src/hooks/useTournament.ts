'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { readWishes } from '@/mocks/wishStorage';
import type { ProductT, RankedProductT } from '@/types/product';
import { writeResult } from '@/utils/resultStorage';

const ROUND_LABELS = [
  '8강 라운드 1',
  '8강 라운드 2',
  '8강 라운드 3',
  '8강 라운드 4',
  '4강 라운드 1',
  '4강 라운드 2',
  '🏆 결승전',
];

const LOSER_RANKS = [8, 7, 6, 5, 4, 3, 2];

const NEXT_SLOT: Record<number, { matchIdx: number; side: 'left' | 'right' }> = {
  0: { matchIdx: 4, side: 'left' },
  1: { matchIdx: 4, side: 'right' },
  2: { matchIdx: 5, side: 'left' },
  3: { matchIdx: 5, side: 'right' },
  4: { matchIdx: 6, side: 'left' },
  5: { matchIdx: 6, side: 'right' },
};

type MatchPair = [ProductT, ProductT];

const EMPTY_MATCHES: Array<MatchPair | null> = [null, null, null, null, null, null, null];

export function useTournament() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductT[]>([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [matches, setMatches] = useState<Array<MatchPair | null>>(EMPTY_MATCHES);

  const rankedRef = useRef<RankedProductT[]>([]);
  const pendingRef = useRef<Partial<Record<number, { left?: ProductT; right?: ProductT }>>>({});

  useEffect(() => {
    const p = readWishes().slice(0, 8);
    setProducts(p);
    if (p.length >= 8) {
      setMatches([
        [p[0]!, p[1]!],
        [p[2]!, p[3]!],
        [p[4]!, p[5]!],
        [p[6]!, p[7]!],
        null,
        null,
        null,
      ]);
    }
  }, []);

  const currentMatch = matches[matchIndex];
  const roundLabel = ROUND_LABELS[matchIndex] ?? '';

  const handleSelect = (winner: ProductT) => {
    const currentPair = matches[matchIndex];
    if (!currentPair) return;

    const loser = winner === currentPair[0] ? currentPair[1] : currentPair[0];
    rankedRef.current = [...rankedRef.current, { ...loser, rank: LOSER_RANKS[matchIndex]! }];

    if (matchIndex === 6) {
      const finalRanked: RankedProductT[] = [
        ...rankedRef.current,
        { ...winner, rank: 1 },
      ].sort((a, b) => a.rank - b.rank);
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
        const pair: MatchPair = [pending.left, pending.right];
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
}
