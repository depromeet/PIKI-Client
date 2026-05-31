import type { ItemTypeT } from '@/types/item';

export const isItemType = (type: string): type is ItemTypeT => {
  return type === 'wish' || type === 'tournament';
};
