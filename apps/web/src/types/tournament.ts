<<<<<<< HEAD
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
=======
export type TournamentItemT = {
  tournamentItemId: number;
  itemId: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
>>>>>>> 8ad1c1e (refactor: 토너먼트 아이템 타입 정의를 공통 타입으로 분리)
};
