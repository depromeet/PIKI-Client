import type { TOURNAMENT_ITEM_STATUS, TOURNAMENT_STATUS } from '@/consts/tournament';

export type TournamentStatusT = (typeof TOURNAMENT_STATUS)[keyof typeof TOURNAMENT_STATUS];

export type TournamentItemStatusT = 'PROCESSING' | 'READY' | 'FAILED';

export type TournamentItemT = {
  tournamentItemId: number;
  itemId?: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string | null;
};

export type TournamentMatchHistoryT = {
  currentRound: number;
  firstTournamentItemId: number;
  secondTournamentItemId: number;
  selectedTournamentItemId: number;
};

export type TournamentRankingT = TournamentItemT & {
  rank: number;
};

export type PostTournamentOCRResponseT = {
  itemIds: number[];
};

export type TournamentItemStatusT =
  (typeof TOURNAMENT_ITEM_STATUS)[keyof typeof TOURNAMENT_ITEM_STATUS];
