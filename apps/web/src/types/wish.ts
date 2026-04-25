export type ProductT = {
  url: string;
  shopName: string;
  shopHost: string;
  imageUrl: string;
  name: string;
  price: number;
};

export type WishT = ProductT & {
  wishId: string;
  createdAt: string;
};
