export type WishTabT = '저장한 위시템' | '토너먼트 기록';

export type PatchWishPayloadT = {
  name?: string | null;
  currentPrice?: number | null;
  imageUrl?: string | null;
  currency?: string | null;
};

export type WishlistEntryT = {
  wish: {
    id: number;
    createdAt: string;
  };
  item: {
    id: number;
    name: string;
    currentPrice: number;
    currency: string;
    imageUrl: string;
    sourceUrl: string;
  };
};
