import type {
  TournamentItemT,
  TournamentMatchHistoryT,
  TournamentRankingT,
  TournamentStatusT,
} from '@/types/tournament';

export type TournamentParticipantT = {
  userId: string;
  nickname: string;
  profileImage: string;
};

/** PENDING — 토너먼트 아이템 담는 중 */
export type GetTournamentPendingResponseT = {
  tournamentId: number;
  name: string;
  /** 요청자가 토너먼트 소유자(주최자)인지 여부 */
  isOwner: boolean;
  status: Extract<TournamentStatusT, 'PENDING'>;
  pending: {
    items: Array<Partial<TournamentItemT> & { tournamentItemId: number; itemId: number }>;
    participants: TournamentParticipantT[];
  };
};

/** IN_PROGRESS — 진행 중 (재진입 시 복원용) */
export type GetTournamentInProgressResponseT = {
  tournamentId: number;
  name: string;
  /** 요청자가 토너먼트 소유자(주최자)인지 여부 */
  isOwner: boolean;
  status: Extract<TournamentStatusT, 'IN_PROGRESS'>;
  inProgress: {
    currentRound: number;
    lastHistory: TournamentMatchHistoryT | null;
    remainingItems: TournamentItemT[];
  };
};

/** COMPLETED — 결과 */
export type GetTournamentCompletedResponseT = {
  tournamentId: number;
  name: string;
  /** 요청자가 토너먼트 소유자(주최자)인지 여부 */
  isOwner: boolean;
  status: Extract<TournamentStatusT, 'COMPLETED'>;
  completed: {
    result: TournamentRankingT[];
  };
};

export type GetTournamentResponseT =
  | GetTournamentPendingResponseT
  | GetTournamentInProgressResponseT
  | GetTournamentCompletedResponseT;

export type PostStartTournamentResponseT = {
  items: TournamentItemT[];
};

/** 플레이 링크 생성 응답 — playLinkExpiresAt 문자열만 반환 */
export type PostPlayLinkResponseT = string;

export type PostRecordMatchRequestT = TournamentMatchHistoryT;

/**
 * 결승(currentRound=2) 기록 시 1~4위 결과가 함께 반환된다.
 * 그 외 라운드는 null.
 */
export type PostRecordMatchResponseT = { result: TournamentRankingT[] } | null;
