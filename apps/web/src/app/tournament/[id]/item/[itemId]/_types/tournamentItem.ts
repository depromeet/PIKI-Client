import type { TOURNAMENT_ITEM_STATUS } from '@/consts/tournament';

export type GetTournamentItemResponseT = {
  tournamentItemId: number;
  itemId: number;
} & (
  | {
      status: (typeof TOURNAMENT_ITEM_STATUS)['PROCESSING'];
      name: null;
      imageUrl: null;
      price: null;
      currency: string;
    }
  | {
      status: (typeof TOURNAMENT_ITEM_STATUS)['READY'];
      name: string;
      imageUrl: string;
      price: number;
      currency: string;
    }
  | {
      status: (typeof TOURNAMENT_ITEM_STATUS)['FAILED'];
    }
);
