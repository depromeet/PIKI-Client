import { dummyProducts } from '@/mocks/products';
import type { ProductT } from '@/types/product';

export type DummyPositionT = {
  emoji: string;
  top: number;
  left: number;
};

export const DUMMY_PLATFORM = 'piki-dummy';

export const isDummyProduct = (product: ProductT) => product.platform === DUMMY_PLATFORM;

export const DUMMY_POSITIONS: DummyPositionT[] = [
  { emoji: '👟', top: 21.5, left: 31.0 },
  { emoji: '🧥', top: 27.5, left: 62.3 },
  { emoji: '👕', top: 43.0, left: 77.1 },
  { emoji: '🧢', top: 57.4, left: 23.5 },
  { emoji: '🎧', top: 66.5, left: 62.3 },
  { emoji: '👜', top: 81.3, left: 33.8 },
  { emoji: '🕶', top: 78.7, left: 73.7 },
];

export const buildDummyWishes = (): ProductT[] => {
  return DUMMY_POSITIONS.slice(0, 7).map((position, index) => {
    const source = dummyProducts[index];
    if (!source) {
      return {
        url: `https://piki.today/dummy/${index + 1}`,
        thumbnail: position.emoji,
        name: '',
        imagePath: '',
        price: 0,
        platform: DUMMY_PLATFORM,
        platformLogoPath: '',
      };
    }
    return {
      ...source,
      thumbnail: position.emoji,
      platform: DUMMY_PLATFORM,
    };
  });
};
