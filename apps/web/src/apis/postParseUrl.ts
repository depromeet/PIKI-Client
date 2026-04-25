import { mockProduct } from '@/mocks/products';
import type { ProductT } from '@/types/wish';

const PARSE_DELAY_MS = 800;

export const postParseUrl = async (url: string): Promise<ProductT> => {
  await new Promise(resolve => setTimeout(resolve, PARSE_DELAY_MS));
  return { ...mockProduct, url };
};
