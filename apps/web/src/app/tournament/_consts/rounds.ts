export const ROUND_LABELS = [
  '8강 라운드 1',
  '8강 라운드 2',
  '8강 라운드 3',
  '8강 라운드 4',
  '4강 라운드 1',
  '4강 라운드 2',
  '🏆 결승전',
] as const;

export const FINAL_ROUND_LABEL = ROUND_LABELS[6];

// matchIndex → 패자에게 부여되는 등수
export const LOSER_RANKS = [8, 7, 6, 5, 4, 3, 2] as const;

// matchIndex → 승자가 다음에 채울 슬롯 정보
export const NEXT_SLOT: Record<number, { matchIdx: number; side: 'left' | 'right' }> = {
  0: { matchIdx: 4, side: 'left' },
  1: { matchIdx: 4, side: 'right' },
  2: { matchIdx: 5, side: 'left' },
  3: { matchIdx: 5, side: 'right' },
  4: { matchIdx: 6, side: 'left' },
  5: { matchIdx: 6, side: 'right' },
};
