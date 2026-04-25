const USER_ID_KEY = 'wishmeet:userId';

export const getUserId = (): string => {
  if (typeof window === 'undefined') return '';

  const stored = window.localStorage.getItem(USER_ID_KEY);
  if (stored) return stored;

  const next = window.crypto.randomUUID();
  window.localStorage.setItem(USER_ID_KEY, next);
  return next;
};

export const ensureUserId = () => {
  getUserId();
};
