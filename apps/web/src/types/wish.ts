export type ProductT = {
  url: string;
  shopName: string;
  shopHost: string;
  imageUrl: string;
  name: string;
  price: number;
  reason?: string;
};

export type ParseResultT = {
  url: string;
  shopName: string;
  shopHost: string;
  imageUrl: string;
  name: string | null;
  price: number | null;
};

export type WishT = ProductT & {
  wishId: string;
  createdAt: string;
};
