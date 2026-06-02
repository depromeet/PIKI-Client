import type { TournamentT } from '@/types/tournament';

export const parseTournamentId = (id: string): TournamentT['tournamentId'] | null => {
  const numberId = Number(id);
  if (!Number.isInteger(numberId) || numberId <= 0) return null;
  return numberId;
};
