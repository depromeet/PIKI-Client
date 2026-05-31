import type { ItemT } from '@/types/item';
import type { WishT } from '@/types/wish';

export type WishTabT = '저장한 위시템' | '토너먼트 기록';

export type WishlistEntryT = {
  wish: WishT;
  item: ItemT;
};
