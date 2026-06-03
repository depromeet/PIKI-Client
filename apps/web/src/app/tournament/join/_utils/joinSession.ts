import type { ProfileTypeT } from '@/components/common/user-profile-group/userProfile.const';

const STORAGE_KEY = 'piki:joinWelcome';

export type JoinWelcomePayloadT = {
  tournamentId: number;
  nickname: string;
  profileType: ProfileTypeT;
};

export const setJoinWelcome = (payload: JoinWelcomePayloadT) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

const readJoinWelcome = (): JoinWelcomePayloadT | null => {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as JoinWelcomePayloadT;
  } catch {
    return null;
  }
};

/**
 * payload가 주어진 tournamentId와 일치할 때만 반환 + 삭제.
 * 다른 토너먼트면 그대로 유지.
 */
export const consumeJoinWelcomeFor = (tournamentId: number): JoinWelcomePayloadT | null => {
  const payload = readJoinWelcome();
  if (!payload) return null;
  if (payload.tournamentId !== tournamentId) return null;
  sessionStorage.removeItem(STORAGE_KEY);
  return payload;
};
