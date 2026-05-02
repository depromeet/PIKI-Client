import { readWishes } from '@/mocks/wishStorage';
import type { ProductT } from '@/types/product';

export const getWishes = async (): Promise<ProductT[]> => {
  return readWishes();
};
