import { getMockProductByIndex } from '@/mocks/products';
import { readWishes } from '@/mocks/wishStorage';
import type { ProductT } from '@/types/wish';

const PARSE_DELAY_MS = 1500;

export const postParseUrl = async (url: string): Promise<ProductT> => {
  await new Promise(resolve => setTimeout(resolve, PARSE_DELAY_MS));
  const currentCount = readWishes().length;
  const product = getMockProductByIndex(currentCount);
  return { ...product, url };
};
