import { getMockProductByIndex } from '@/mocks/products';
import { readWishes } from '@/mocks/wishStorage';
import type { ParseResultT } from '@/types/wish';

const PARSE_DELAY_MS = 1500;

export const postParseUrl = async (url: string): Promise<ParseResultT> => {
  await new Promise(resolve => setTimeout(resolve, PARSE_DELAY_MS));

  const currentCount = readWishes().length;
  const baseProduct = getMockProductByIndex(currentCount);

  const lower = url.toLowerCase();
  const isPartial = lower.includes('partial') || lower.includes('fail');
  const isNoImage = lower.includes('noimage');

  return {
    ...baseProduct,
    url,
    imageUrl: isNoImage || isPartial ? '' : baseProduct.imageUrl,
    name: isPartial ? null : baseProduct.name,
    price: isPartial ? null : baseProduct.price,
  };
};
