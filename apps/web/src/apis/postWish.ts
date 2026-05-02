import { readWishes, writeWishes } from '@/mocks/wishStorage';
import type { ProductT } from '@/types/product';

export const postWish = async (product: ProductT): Promise<ProductT> => {
  const current = readWishes();
  writeWishes([...current, product]);
  return product;
};
