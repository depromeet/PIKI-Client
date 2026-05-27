import type { TOURNAMENT_STATUS } from '@/consts/tournament';
import type { TournamentItemT } from '@/types/tournament';

export type { TournamentItemT };

export type TournamentItemLinkDataT = {
  itemId: number;
};

export type TournamentStatusT = (typeof TOURNAMENT_STATUS)[keyof typeof TOURNAMENT_STATUS];

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
