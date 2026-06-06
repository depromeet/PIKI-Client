import { getShareExtensionKey } from 'expo-share-intent';

/** expo-share-intent 딥링크(piki://dataUrl=...)를 라우트로 해석하지 않도록 리다이렉트 */
export function redirectSystemPath({ path }: { path: string; initial: boolean }) {
  if (path.includes(`dataUrl=${getShareExtensionKey()}`)) return '/';

  return path;
}
