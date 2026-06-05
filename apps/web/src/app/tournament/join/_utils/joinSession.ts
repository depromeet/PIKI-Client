import type { ProfileTypeT } from '@/components/user-profile-group/userProfile.const';

const WELCOME_KEY = 'piki:joinWelcome';
const CONFIRM_KEY = 'piki:joinConfirm';

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
