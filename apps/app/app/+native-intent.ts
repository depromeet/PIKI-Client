import { getShareExtensionKey } from 'expo-share-intent';

/**
 * 시스템 딥링크(piki://...)를 Expo Router 경로로 변환
 *
 * - expo-share-intent: piki://dataUrl=... → /
 * - share extension: piki:///?web=... → /?web=... (`web`은 `/`로 시작하는 웹 경로)
 */
export function redirectSystemPath({ path }: { path: string; initial: boolean }) {
  /** share intent 딥링크 — 네이티브 라우트 해석 없이 루트로 보냄 */
  if (path.includes(`dataUrl=${getShareExtensionKey()}`)) return '/';

  try {
    /** share extension → openHostApp(`/?web=${encodeURIComponent('/archive?tab=wish')}`) */
    const url = new URL(path, 'piki://app');
    const web = url.searchParams.get('web');

    if (web?.startsWith('/')) return `/?web=${encodeURIComponent(web)}`;
  } catch {
    return path;
  }

  return path;
}
