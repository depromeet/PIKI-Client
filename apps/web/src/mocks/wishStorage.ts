import { buildDummyWishes } from '@/mocks/dummyWishes';
import type { WishT } from '@/types/wish';

const STORAGE_KEY = 'piki:wishes';
const VISITED_KEY = 'piki:visited';

const isClient = () => typeof window !== 'undefined';

const ensureSeeded = () => {
  if (!isClient()) return;
  if (window.localStorage.getItem(VISITED_KEY)) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(buildDummyWishes()));
  window.localStorage.setItem(VISITED_KEY, 'true');
};

export const readWishes = (): WishT[] => {
  if (!isClient()) return [];
  ensureSeeded();
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
