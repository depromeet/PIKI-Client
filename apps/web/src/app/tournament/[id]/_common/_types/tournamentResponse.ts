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
    /** 초대 코드 (영문 대문자 3 + 숫자 3, 서버 패턴: [A-Z]{3}\d{3}) */
    inviteCode: string;
    /** 초대 코드 만료 시각 (ISO 8601) */
    inviteExpiresAt: string;
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
    /** 참여자 2명 이상이면 true — 친구 토너먼트 결과 보기 버튼 노출용 */
    hasGroupResult: boolean;
    /** 플레이 링크 만료 시각 (ISO 8601). 아직 링크 생성 전이면 응답에 없음 */
    playLinkExpiresAt?: string;
  };
};

export type GetTournamentResponseT =
  | GetTournamentPendingResponseT
  | GetTournamentInProgressResponseT
  | GetTournamentCompletedResponseT;

/**
 * 시작 응답.
 * - 주최자(ROOT): 본인 tournamentId 반환
 * - 참여자(CLONE): 새로 생성된 CLONE tournamentId 반환 (이후 본인 ID 로 진행)
 */
export type PostStartTournamentResponseT = {
  tournamentId: number;
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
