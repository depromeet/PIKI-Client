import type { TOURNAMENT_STATUS } from '@/consts/tournament';

export type TournamentStatusT = (typeof TOURNAMENT_STATUS)[keyof typeof TOURNAMENT_STATUS];

export type PostTournamentOCRResponseT = {
  itemIds: number[];
};
