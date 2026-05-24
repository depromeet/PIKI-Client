import type { TournamentStatusT } from '@/types/tournament';

export type GetTournamentListResponseT = TournamentT[];

export type TournamentT = {
  tournamentId: string;
  name: string;
  status: TournamentStatusT;
  createdAt: string;
  participantProfileImages: string[];
};
