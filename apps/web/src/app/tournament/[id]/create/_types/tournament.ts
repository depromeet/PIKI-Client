import type { ItemStatusT } from '@/types/item';

export type PostTournamentItemLinkResponseT = {
  tournamentItemId: number;
};

export type GetTournamentItemResponseT = {
  tournamentItemId: number;
  itemId: number;
  name: string | null;
  imageUrl: string | null;
  price: number | null;
  currency: string | null;
  status: ItemStatusT;
};
