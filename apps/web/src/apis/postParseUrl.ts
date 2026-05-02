import { dummyProducts } from '@/mocks/products';
import { readWishes } from '@/mocks/wishStorage';
import type { ParseResultT } from '@/types/wish';

const PARSE_DELAY_MS = 4000;

const extractHost = (url: string): string => {
  try {
    return new URL(url).host;
  } catch {
    return '';
  }
};

export const postParseUrl = async (url: string): Promise<ParseResultT> => {
  await new Promise(resolve => setTimeout(resolve, PARSE_DELAY_MS));

  const currentCount = readWishes().length;
  const baseProduct = dummyProducts[currentCount % dummyProducts.length]!;

  const lower = url.toLowerCase();
  const isPartial = lower.includes('partial') || lower.includes('fail');
  const isNoImage = lower.includes('noimage');

  return {
    url,
    shopName: baseProduct.platform,
    shopHost: extractHost(baseProduct.url),
    imageUrl: isNoImage || isPartial ? '' : baseProduct.imagePath,
    name: isPartial ? null : baseProduct.name,
    price: isPartial ? null : baseProduct.price,
  };
};
