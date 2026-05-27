import type { TOURNAMENT_STATUS } from '@/consts/tournament';

export type TournamentStatusT = (typeof TOURNAMENT_STATUS)[keyof typeof TOURNAMENT_STATUS];

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
