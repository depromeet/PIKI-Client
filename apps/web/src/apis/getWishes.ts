import { readWishes } from '@/mocks/wishStorage';
import type { WishT } from '@/types/wish';

export const getWishes = async (): Promise<WishT[]> => {
  return readWishes();
};
