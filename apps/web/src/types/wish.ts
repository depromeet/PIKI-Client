import type { ItemT } from './item';

export type PostWishOCRResponseT = {
  wish: WishT;
  item: ItemT;
};

export type WishT = {
  id: number;
  createdAt: string;
};
