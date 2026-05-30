export type WishTabT = '저장한 위시템' | '토너먼트 기록';

export type PatchWishRequestT = {
  name?: string | null;
  currentPrice?: number | null;
  imageUrl?: string | null;
  currency?: string | null;
};

export type WishlistEntryT = {
  // TODO: WishT로 교체
  wish: {
    id: number;
    createdAt: string;
  };
  // TODO: ItemT로 교체
  item: {
    id: number;
    status: 'OK' | 'FAILED';
    name: string | null;
    currentPrice: number | null;
    currency: string | null;
    imageUrl: string | null;
    sourceUrl: string;
  };
};
