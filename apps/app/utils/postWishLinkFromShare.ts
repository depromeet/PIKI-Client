import { AUTH_KEYS, getSecureItem, setSecureItem } from '@/utils/secureStore';

type PostWishLinkFromShareResultT = { ok: true } | { ok: false; message: string };

const postWishLink = async (productUrl: string, accessToken: string) =>
  fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/wishlists`, {
    method: 'POST',
    headers: {
      'X-Client-Type': 'app',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ url: productUrl }),
  });

const postTokenRefresh = async (refreshToken: string) =>
  fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/token/refresh`, {
    method: 'POST',
    headers: {
      'X-Client-Type': 'app',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

/** Share Extension에서 링크로 위시 등록 */
export const postWishLinkFromShare = async (
  productUrl: string
): Promise<PostWishLinkFromShareResultT> => {
  if (!process.env.EXPO_PUBLIC_API_URL)
    return { ok: false, message: 'API 주소가 설정되지 않았어요' };

  const accessToken = await getSecureItem(AUTH_KEYS.ACCESS_TOKEN);
  const refreshToken = await getSecureItem(AUTH_KEYS.REFRESH_TOKEN);

  if (!accessToken) return { ok: false, message: '로그인이 필요해요' };

  try {
    /** 위시 등록 시도 */
    let postWishResponse = await postWishLink(productUrl, accessToken);

    if (postWishResponse.status === 401 && refreshToken) {
      /** 토큰 만료 시 토큰 갱신 */
      const refreshResponse = await postTokenRefresh(refreshToken);

      if (!refreshResponse.ok) return { ok: false, message: '로그인이 만료됐어요' };

      /** 토큰 갱신 후 토큰 저장 */
      const refreshBody = (await refreshResponse.json()) as {
        data: { accessToken: string; refreshToken: string };
      };
      await Promise.all([
        setSecureItem(AUTH_KEYS.ACCESS_TOKEN, refreshBody.data.accessToken),
        setSecureItem(AUTH_KEYS.REFRESH_TOKEN, refreshBody.data.refreshToken),
      ]);

      /** 위시 등록 재시도 */
      postWishResponse = await postWishLink(productUrl, refreshBody.data.accessToken);
    }

    if (!postWishResponse.ok) return { ok: false, message: '요청 처리 중 오류가 발생했습니다.' };

    return { ok: true };
  } catch {
    return { ok: false, message: '네트워크 오류가 발생했어요' };
  }
};
