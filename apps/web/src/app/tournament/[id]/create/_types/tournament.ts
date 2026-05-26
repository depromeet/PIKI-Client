import type { TOURNAMENT_STATUS } from '@/consts/tournament';

export type TournamentItemLinkDataT = {
  itemId: number;
};

export type TournamentStatusT = (typeof TOURNAMENT_STATUS)[keyof typeof TOURNAMENT_STATUS];

export type TournamentItemT = {
  tournamentItemId: number;
  itemId: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
};

export type TournamentParticipantT = {
  userId: string;
  nickname: string;
  profileImage: string;
};

export type TournamentDataT = {
  tournamentId: number;
  name: string;
  status: TournamentStatusT;
  pending?: {
    items: TournamentItemT[];
    participants: TournamentParticipantT[];
  };
};

export type PostTournamentItemLinkResponseT = {
  itemId: number;
};

export type PostTournamentStartResponseT = {
  items: Omit<TournamentItemT, 'itemId'>[];
};
