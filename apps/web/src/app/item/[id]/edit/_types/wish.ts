import type { ItemT } from '@/types/item';
import type { WishT } from '@/types/wish';

export type GetWishResponseT = {
  wish: WishT;
  item: ItemT;
};

export type PatchWishRequestT = {
  name?: string;
  currentPrice?: number;
  imageUrl?: string;
  currency?: string;
};

export type PatchWishResponseT = GetWishResponseT;
