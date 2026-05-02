import type { ProductT } from '@/types/product';

export type ParseResultT = Omit<ProductT, 'name' | 'price'> & {
  name: string | null;
  price: number | null;
};
