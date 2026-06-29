/** 앱이 감싸는 웹앱의 호스트 — Universal Link / Smart App Banner app-argument 검증용 */
const WEB_HOSTS = ['piki.day', 'staging.piki.day', 'dev.piki.day'];

/**
 * 외부 https 링크(Universal Link)나 Smart App Banner의 app-argument 에서
 * 우리 웹 경로(pathname + search)를 추출한다. 우리 호스트가 아니면 null.
 *
 * 예) https://piki.day/tournament/join/123?code=abc → /tournament/join/123?code=abc
 */
export const extractWebPathFromUrl = (rawUrl: string): string | null => {
  try {
    const url = new URL(rawUrl);
    const isHttp = url.protocol === 'https:' || url.protocol === 'http:';

    if (isHttp && WEB_HOSTS.includes(url.hostname)) {
      return `${url.pathname}${url.search}`;
    }
  } catch {
    // 절대 URL 이 아니면 (커스텀 스킴 등) 호출부에서 다른 방식으로 처리
  }

  return null;
};
