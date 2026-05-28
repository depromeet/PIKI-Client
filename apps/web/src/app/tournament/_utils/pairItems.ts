import type { TournamentItemT } from '@/types/tournament';

export type ItemPairT = [TournamentItemT, TournamentItemT];

/**
 * 토너먼트 아이템을 가격 오름차순으로 정렬한 뒤 인접한 2개씩 페어로 묶는다.
 *
 * 매칭 알고리즘 (백엔드 담당과 합의된 룰):
 * - 가격 오름차순 정렬
 * - 정렬된 배열의 [0, 1], [2, 3], ... 인접 2개씩 매치
 *
 * 같은 가격이면 tournamentItemId 오름차순으로 안정적 정렬.
 * 입력 길이가 홀수면 마지막 아이템은 페어에서 제외된다 (참가자 수는 2의 거듭제곱이라는 전제).
 */
export const pairByPriceAsc = (items: TournamentItemT[]): ItemPairT[] => {
  const sorted = [...items].sort((a, b) => {
    if (a.price !== b.price) return a.price - b.price;
    return a.tournamentItemId - b.tournamentItemId;
  });

  const pairs: ItemPairT[] = [];
  for (let i = 0; i + 1 < sorted.length; i += 2) {
    pairs.push([sorted[i]!, sorted[i + 1]!]);
  }
  return pairs;
};

/**
 * 페어 배열의 등장 순서를 Fisher–Yates로 셔플한다.
 * 페어 내부의 좌/우 순서는 유지 — 같은 가격대끼리 붙는 매칭 자체는 그대로.
 */
export const shufflePairs = (pairs: ItemPairT[]): ItemPairT[] => {
  const shuffled = [...pairs];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
};
