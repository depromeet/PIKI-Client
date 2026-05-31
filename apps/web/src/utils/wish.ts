import type { ItemT } from '@/types/item';

export const parseWishId = (id: string): ItemT['id'] | null => {
  const numberId = Number(id);
  if (!Number.isInteger(numberId) || numberId <= 0) return null;
  return numberId;
};
