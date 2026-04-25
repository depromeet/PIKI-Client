import type { WishT } from '@/types/wish';

const STORAGE_KEY = 'wishmeet:wishes';

const isClient = () => typeof window !== 'undefined';

export const readWishes = (): WishT[] => {
  if (!isClient()) return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as WishT[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeWishes = (wishes: WishT[]) => {
  if (!isClient()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
};
