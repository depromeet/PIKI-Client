export type WishT = {
  wish: {
    id: number;
    createdAt: string;
  };
  item: {
    id: number;
    name: string;
    currentPrice: number;
    currency: string | null;
    imageUrl: string | null;
    sourceUrl: string | null;
  };
};

export type GetWishlistResponseT = WishT[];

export type PatchWishRequestT = {
  name?: string;
  currentPrice?: number;
  imageUrl?: string;
  currency?: string;
};

export type PatchWishResponseT = WishT;
