/** 네이티브 토큰 갱신 — 응답(Response)을 그대로 반환, 처리는 호출부에서 */
export const postTokenRefresh = (refreshToken: string) =>
  fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/token/refresh`, {
    method: 'POST',
    headers: {
      'X-Client-Type': 'app',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
