import type { RankedProductT } from '@/types/product';

const STORAGE_KEY = 'piki:result';

/** 브라우저에서만 호출. 깨졌거나 형식 안 맞으면 null */
export function readPikiResultAsRankedProducts(): RankedProductT[] | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null || raw === '') return null;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;

    const rows: RankedProductT[] = [];
    for (const entry of parsed) {
      if (typeof entry !== 'object' || entry === null) return null;

      const url = Reflect.get(entry, 'url');
      const thumbnail = Reflect.get(entry, 'thumbnail');
      const name = Reflect.get(entry, 'name');
      const imagePath = Reflect.get(entry, 'imagePath');
      const price = Reflect.get(entry, 'price');
      const platform = Reflect.get(entry, 'platform');
      const platformLogoPath = Reflect.get(entry, 'platformLogoPath');
      const rank = Reflect.get(entry, 'rank');

      if (
        typeof url !== 'string' ||
        typeof thumbnail !== 'string' ||
        typeof name !== 'string' ||
        typeof imagePath !== 'string' ||
        typeof price !== 'number' ||
        Number.isNaN(price) ||
        typeof platform !== 'string' ||
        typeof platformLogoPath !== 'string' ||
        typeof rank !== 'number' ||
        Number.isNaN(rank)
      ) {
        return null;
      }

      rows.push({
        url,
        thumbnail,
        name,
        imagePath,
        price,
        platform,
        platformLogoPath,
        rank,
      });
    }

    return rows;
  } catch {
    return null;
  }
}
