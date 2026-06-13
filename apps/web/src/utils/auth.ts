/** JWT 토큰 페이로드 추출 */
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

/** JWT 토큰 유효성 검증 */
export const isTokenValid = (token: string) => {
  const payload = decodeJwt(token);
  if (!payload || !payload.exp) return false;

  const expiryTime = payload.exp * 1000;
  const currentTime = Date.now();

  return currentTime < expiryTime;
};
