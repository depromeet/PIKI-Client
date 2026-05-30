import type { TournamentItemT, TournamentStatusT } from '@/types/tournament';

export type TournamentParticipantT = {
  userId: string;
  nickname: string;
  profileImage: string;
};

export type GetTournamentResponseT = {
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
