import type { RankedProductT } from '@/app/tournament/types/tournamentTypes';

const RESULT_KEY = 'piki:result';

export const writeResult = (result: RankedProductT[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(RESULT_KEY, JSON.stringify(result));
};

export const readResult = (): RankedProductT[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(RESULT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RankedProductT[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const clearResult = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(RESULT_KEY);
};
