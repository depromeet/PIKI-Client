/** 쿠키에서 특정 값 가져오기 */
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  if (!matches) return null;

  const cookieValue = matches[1];
  if (!cookieValue) return null;

  return decodeURIComponent(cookieValue);
};

/** 쿠키 설정 */
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof document === 'undefined') return;

  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  let cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; samesite=lax`;

  /** secure 속성은 프로덕션 환경에서만 설정 */
  if (process.env.NODE_ENV === 'production') cookie += '; secure';
  document.cookie = cookie;
};

/** 쿠키 삭제 */
const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export { deleteCookie, getCookie, setCookie };
