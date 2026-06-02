import type { ITEM_STATUS } from '@/consts/item';

export type GetTournamentItemResponseT = {
  tournamentItemId: number;
  itemId: number;
} & (
  | {
      status: (typeof ITEM_STATUS)['PROCESSING'];
      name: null;
      imageUrl: null;
      price: null;
      currency: string;
    }
  | {
      status: (typeof ITEM_STATUS)['READY'];
      name: string;
      imageUrl: string;
      price: number;
      currency: string;
      sourceUrl?: string;
    }
  | {
      status: (typeof ITEM_STATUS)['FAILED'];
    }
);
