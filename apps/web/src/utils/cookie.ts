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
const setCookie = (
  name: string,
  value: string,
  options?: { days?: number; hours?: number; minutes?: number }
) => {
  if (typeof document === 'undefined') return;

  let expires = '';
  if (options) {
    const { days = 0, hours = 0, minutes = 0 } = options;

    const time = ((days * 24 + hours) * 60 + minutes) * 60 * 1000;
    const expiresDate = new Date(Date.now() + time).toUTCString();
    expires = `; expires=${expiresDate}`;
  }
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
