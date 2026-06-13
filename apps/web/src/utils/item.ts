import type { ItemStatusT, ItemTypeT } from '@/types/item';

export const isItemType = (type: string): type is ItemTypeT => {
  return type === 'wish' || type === 'tournament';
};

export const hasParsingItems = (items: { status?: ItemStatusT }[]) =>
  items.some(item => item.status === 'PENDING' || item.status === 'PROCESSING');
