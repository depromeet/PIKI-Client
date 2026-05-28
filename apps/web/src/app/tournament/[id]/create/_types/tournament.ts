import type { TournamentItemStatusT, TournamentItemT, TournamentStatusT } from '@/types/tournament';

export type { TournamentItemStatusT, TournamentItemT, TournamentStatusT };

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

export type GetTournamentItemResponseT = {
  tournamentItemId: number;
  itemId: number;
  name: string | null;
  imageUrl: string | null;
  price: number | null;
  currency: string | null;
  status: TournamentItemStatusT;
};
