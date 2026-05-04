import type { RankedProductT } from '@/types/product';

const RESULT_KEY = 'piki:result';

export const writeResult = (result: RankedProductT[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(RESULT_KEY, JSON.stringify(result));
};
