export type ItemTypeT = 'wish' | 'tournament';

export type ItemT = {
  id: number;
  name: string;
  currentPrice: number;
  currency: string | null;
  imageUrl: string | null;
  sourceUrl: string | null;
};
