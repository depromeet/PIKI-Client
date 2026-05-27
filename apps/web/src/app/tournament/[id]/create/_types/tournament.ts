import type { TournamentItemT, TournamentStatusT } from '@/types/tournament';

export type { TournamentItemT, TournamentStatusT };

export type TournamentItemLinkDataT = {
  itemId: number;
};

export type TournamentParticipantT = {
  userId: string;
  nickname: string;
  profileImage: string;
};

export type TournamentStartDataT = {
  items: Omit<TournamentItemT, 'itemId'>[];
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
