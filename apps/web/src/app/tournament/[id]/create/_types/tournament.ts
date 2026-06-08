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
    /** 초대 코드 (영문 대문자 3 + 숫자 3) */
    inviteCode: string;
    /** 초대 코드 만료 시각 (ISO 8601) */
    inviteExpiresAt: string;
    items: TournamentItemT[];
    participants: TournamentParticipantT[];
  };
};

export type PostTournamentItemLinkResponseT = {
  tournamentItemId: number;
};

/**
 * 시작 응답.
 * - 주최자(ROOT): 본인 tournamentId 반환
 * - 참여자(CLONE): 새로 생성된 CLONE tournamentId 반환 (이후 본인 ID 로 진행)
 */
export type PostTournamentStartResponseT = {
  tournamentId: number;
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
