import type { StaticImageData } from 'next/image';

import type { ItemStatusT } from '@/types/item';
import type { TournamentItemT, TournamentStatusT } from '@/types/tournament';

export type TournamentParticipantT = {
  userId: string;
  nickname: string;
  profileImage: string;
};

export type WishBasketItemT = {
  tournamentItemId: number | string;
  imageUrl: string | StaticImageData | null;
  status?: ItemStatusT;
};

export type GetTournamentResponseT = {
  tournamentId: number;
  name: string;
  /** 요청자가 토너먼트 소유자(주최자)인지 여부 */
  isOwner: boolean;
  status: TournamentStatusT;
  pending?: {
    items: TournamentItemT[];
    participants: TournamentParticipantT[];
  };
};

export type PostTournamentItemLinkResponseT = {
  tournamentItemId: number;
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
  status: ItemStatusT;
};
