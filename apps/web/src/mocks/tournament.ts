import { mockProducts } from '@/mocks/products';
import type { Match, Product } from '@/types/tournament';

const toTournamentProduct = (index: number): Product => {
  const source = mockProducts[index % mockProducts.length]!;
  return {
    image: source.imageUrl,
    name: source.name,
    price: source.price,
    reason: source.reason ?? '',
  };
};

const ROUND_LABELS = [
  '8강 라운드 1',
  '8강 라운드 2',
  '8강 라운드 3',
  '8강 라운드 4',
  '4강 라운드 1',
  '4강 라운드 2',
  '🏆 결승전',
];

const PAIR_INDEXES: Array<[number, number]> = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [0, 2],
  [4, 6],
  [0, 4],
];

export const MOCK_MATCHES: Match[] = ROUND_LABELS.map((label, i) => {
  const [leftIndex, rightIndex] = PAIR_INDEXES[i]!;
  return {
    label,
    left: toTournamentProduct(leftIndex),
    right: toTournamentProduct(rightIndex),
  };
});
