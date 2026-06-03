import type { ProfileTypeT } from '@/components/common/user-profile-group/userProfile.const';

const STORAGE_KEY = 'piki:joinWelcome';

export type JoinWelcomePayloadT = {
  nickname: string;
  profileType: ProfileTypeT;
};

export const setJoinWelcome = (payload: JoinWelcomePayloadT) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const consumeJoinWelcome = (): JoinWelcomePayloadT | null => {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(STORAGE_KEY);
  try {
    return JSON.parse(raw) as JoinWelcomePayloadT;
  } catch {
    return null;
  }
};
