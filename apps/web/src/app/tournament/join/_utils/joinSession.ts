import type { ProfileTypeT } from '@/components/common/user-profile-group/userProfile.const';

const WELCOME_KEY = 'piki:joinWelcome';
const CONFIRM_KEY = 'piki:joinConfirm';
const PARTICIPANT_KEY = 'piki:participantTournamentIds';

export type JoinWelcomePayloadT = {
  tournamentId: number;
  nickname: string;
  profileType: ProfileTypeT;
};

export type JoinConfirmPayloadT = {
  tournamentId: number;
  nickname: string;
  profileType: ProfileTypeT;
  tournamentName: string;
  itemCount: number;
  participantCount: number;
};

const writeJson = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(key, JSON.stringify(value));
};

const readJson = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

/** 비회원 닉네임 설정 완료 후 환영 노출용 */
export const setJoinWelcome = (payload: JoinWelcomePayloadT) => writeJson(WELCOME_KEY, payload);

export const consumeJoinWelcomeFor = (tournamentId: number): JoinWelcomePayloadT | null => {
  const payload = readJson<JoinWelcomePayloadT>(WELCOME_KEY);
  if (!payload || payload.tournamentId !== tournamentId) return null;
  sessionStorage.removeItem(WELCOME_KEY);
  return payload;
};

/** 회원이 초대 코드만 입력하고 바로 토너먼트로 진입할 때 확인 다이얼로그 노출용 */
export const setJoinConfirm = (payload: JoinConfirmPayloadT) => writeJson(CONFIRM_KEY, payload);

export const consumeJoinConfirmFor = (tournamentId: number): JoinConfirmPayloadT | null => {
  const payload = readJson<JoinConfirmPayloadT>(CONFIRM_KEY);
  if (!payload || payload.tournamentId !== tournamentId) return null;
  sessionStorage.removeItem(CONFIRM_KEY);
  return payload;
};

/**
 * 참여자(주최자 아님)로 입장한 토너먼트 ID 마킹.
 * TODO: API 연동 후 서버 응답의 isHost / role 같은 boolean 필드로 판단하도록 교체.
 *       지금은 클라이언트 localStorage에 임시 저장.
 */
export const markAsParticipant = (tournamentId: number) => {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(PARTICIPANT_KEY);
  const ids: number[] = raw ? safeParseIds(raw) : [];
  if (ids.includes(tournamentId)) return;
  localStorage.setItem(PARTICIPANT_KEY, JSON.stringify([...ids, tournamentId]));
};

export const isParticipantOf = (tournamentId: number): boolean => {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem(PARTICIPANT_KEY);
  if (!raw) return false;
  return safeParseIds(raw).includes(tournamentId);
};

const safeParseIds = (raw: string): number[] => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === 'number') : [];
  } catch {
    return [];
  }
};
