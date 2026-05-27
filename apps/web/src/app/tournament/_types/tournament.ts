import type { ReactNode } from 'react';

import type { TournamentItemT, TournamentRankingT } from '@/types/tournament';

export type ProductT = TournamentItemT;
export type RankedProductT = TournamentRankingT;
export type MatchPairT = [ProductT, ProductT];

export type TagT = {
  name: string;
  icon: ReactNode;
  iconColor: string;
  backgroundColor: string;
  textColor: string;
};

export type CardSideT = 'left' | 'right';
