export type Product = {
  image: string;
  name: string;
  price: number;
  reason: string;
};

export type Match = {
  left: Product;
  right: Product;
  label: string;
};
