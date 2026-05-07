import { dummyProducts } from '@/mocks/products';
import type { ProductT } from '@/types/product';

export type DummyPositionT = {
  top: number;
  left: number;
};

export const DUMMY_PLATFORM = 'piki-dummy';

export const isDummyProduct = (product: ProductT) => product.platform === DUMMY_PLATFORM;

export const DUMMY_POSITIONS: DummyPositionT[] = [
  { top: 22.9, left: 37.9 },
  { top: 27.7, left: 66.5 },
  { top: 45.8, left: 26.9 },
  { top: 49.9, left: 72.1 },
  { top: 66.3, left: 36.4 },
  { top: 75.1, left: 64.5 },
];

export const buildDummyWishes = (): ProductT[] => {
  return DUMMY_POSITIONS.map((_, index) => {
    const source = dummyProducts[index];
    if (!source) {
      return {
        url: `https://piki.today/dummy/${index + 1}`,
        thumbnail: '',
        name: '',
        imagePath: '',
        price: 0,
        platform: DUMMY_PLATFORM,
        platformLogoPath: '',
      };
    }
    return {
      ...source,
      platform: DUMMY_PLATFORM,
    };
  });
};
