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
  /** ROOT(원본)이면 true, CLONE(플레이 링크/멤버 시작으로 복제된 인스턴스)이면 false */
  isRoot: boolean;
  status: TournamentStatusT;
  pending?: {
    /**
     * 주최자가 ROOT 토너먼트를 시작했는지 여부.
     * - false (status=PENDING): "주최자가 시작해야..." 안내
     * - true (status=IN_PROGRESS): 참여자도 본인 CLONE 시작 가능
     */
    ownerStarted: boolean;
    /** 초대 코드. `ownerStarted=true` 이면 이미 초대 기간이 종료돼 null */
    inviteCode: string | null;
    /** 초대 코드 만료 시각 (ISO 8601). `ownerStarted=true` 이면 null */
    inviteExpiresAt: string | null;
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
