export type TournamentStatusT = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export type TournamentItemT = {
  tournamentItemId: number;
  itemId: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
};
