import { mockProducts } from '@/mocks/products';

export type MockProductT = {
  id: number;
  imageUrl: string;
};

export const MOCK_PRODUCTS: MockProductT[] = mockProducts.map((product, index) => ({
  id: index + 1,
  imageUrl: product.imageUrl,
}));
