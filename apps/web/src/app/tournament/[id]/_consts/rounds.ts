export type TransitionStageT = 'toNext' | 'toSemi' | 'toFinal';

export const ROUND_TRANSITION_COPY: Record<
  TransitionStageT,
  { title: string; description: string }
> = {
  toNext: {
    title: '다음 라운드 진출!',
    description: '잘하고 있어요!\n이어서 다음 라운드를 시작할게요',
  },
  toSemi: {
    title: '준결승 진출!',
    description: '얼마 안 남았어요!\n이어서 준결승전을 시작할게요',
  },
  toFinal: {
    title: '결승까지 왔어요!',
    description: '마지막 두 개의 상품만 남았어요\n3초 뒤 시작할게요',
  },
};

// 다음 라운드에 진출하는 아이템 수에 따라 어떤 전환 화면을 보여줄지 결정
// 2 → 결승 진입, 4 → 준결승 진입, 그 외 → 일반 다음 라운드
export const getTransitionStage = (nextRoundItemCount: number): TransitionStageT => {
  if (nextRoundItemCount === 2) return 'toFinal';
  if (nextRoundItemCount === 4) return 'toSemi';
  return 'toNext';
};

// 라운드 라벨 — 현재 라운드 아이템 수 기준 (8 → "8강", 4 → "4강", 2 → "결승")
export const getRoundLabel = (roundItemCount: number, matchIndexInRound: number) => {
  if (roundItemCount === 2) return '🏆 결승전';
  const koreanRoundName = `${roundItemCount}강`;
  const totalMatches = roundItemCount / 2;
  return totalMatches === 1
    ? koreanRoundName
    : `${koreanRoundName} 라운드 ${matchIndexInRound + 1}`;
};
