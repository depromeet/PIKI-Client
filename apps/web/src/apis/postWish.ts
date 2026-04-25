import { readWishes, writeWishes } from '@/mocks/wishStorage';
import type { ProductT, WishT } from '@/types/wish';

export const postWish = async (product: ProductT): Promise<WishT> => {
  const next: WishT = {
    ...product,
    wishId: window.crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const current = readWishes();
  writeWishes([...current, next]);
  return next;
};
