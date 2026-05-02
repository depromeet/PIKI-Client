import type { WishT } from '@/types/wish';

export type DummyPositionT = {
  emoji: string;
  top: number;
  left: number;
};

const DUMMY_WISH_BASE: Omit<WishT, 'wishId' | 'createdAt'>[] = [
  {
    url: 'https://piki.today/dummy/sneakers',
    shopName: 'Piki Demo',
    shopHost: 'piki.today',
    imageUrl: '',
    name: '운동화',
    price: 0,
  },
  {
    url: 'https://piki.today/dummy/trench-coat',
    shopName: 'Piki Demo',
    shopHost: 'piki.today',
    imageUrl: '',
    name: '트렌치코트',
    price: 0,
  },
  {
    url: 'https://piki.today/dummy/pink-tshirt',
    shopName: 'Piki Demo',
    shopHost: 'piki.today',
    imageUrl: '',
    name: '핑크 반팔',
    price: 0,
  },
  {
    url: 'https://piki.today/dummy/cap',
    shopName: 'Piki Demo',
    shopHost: 'piki.today',
    imageUrl: '',
    name: '볼캡',
    price: 0,
  },
  {
    url: 'https://piki.today/dummy/headphones',
    shopName: 'Piki Demo',
    shopHost: 'piki.today',
    imageUrl: '',
    name: '헤드폰',
    price: 0,
  },
  {
    url: 'https://piki.today/dummy/bag',
    shopName: 'Piki Demo',
    shopHost: 'piki.today',
    imageUrl: '',
    name: '가방',
    price: 0,
  },
  {
    url: 'https://piki.today/dummy/sunglasses',
    shopName: 'Piki Demo',
    shopHost: 'piki.today',
    imageUrl: '',
    name: '선글라스',
    price: 0,
  },
];

export const DUMMY_EMOJIS = ['👟', '🧥', '👕', '🧢', '🎧', '👜', '🕶'] as const;

export const DUMMY_POSITIONS: DummyPositionT[] = [
  { emoji: '👟', top: 21.5, left: 31.0 },
  { emoji: '🧥', top: 27.5, left: 62.3 },
  { emoji: '👕', top: 43.0, left: 77.1 },
  { emoji: '🧢', top: 57.4, left: 23.5 },
  { emoji: '🎧', top: 66.5, left: 62.3 },
  { emoji: '👜', top: 81.3, left: 33.8 },
  { emoji: '🕶', top: 78.7, left: 73.7 },
];

export const buildDummyWishes = (): WishT[] => {
  const baseTime = Date.now();
  return DUMMY_WISH_BASE.map((base, index) => ({
    ...base,
    wishId: `dummy-${index + 1}`,
    createdAt: new Date(baseTime - (DUMMY_WISH_BASE.length - index) * 1000).toISOString(),
  }));
};
