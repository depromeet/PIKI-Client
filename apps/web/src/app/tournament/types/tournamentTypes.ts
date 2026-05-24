import type { ReactNode } from 'react';

export type ProductT = {
  id: number;
  url: string;
  name: string;
  imageUrl: string;
  price: number;
  tags?: TagT[];
};

export type RankedProductT = ProductT & {
  rank: number;
};

export type TagT = {
  name: string;
  icon: ReactNode;
  iconColor: string;
  backgroundColor: string;
  textColor: string;
};

export type MatchPairT = [ProductT, ProductT];

export type CardSideT = 'left' | 'right';
