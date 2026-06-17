export const formatTimeKo = (dateString: string) =>
  new Date(dateString).toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

/**
 * 서버가 LocalDateTime (시간대 없는 시각) 을 응답에 `Z` 접미사를 붙여 내려보내는 경우가 있다.
 * `Z` 가 있으면 `new Date()` 가 UTC 로 해석해 9시간(KST 기준) 어긋난다.
 * Z 를 떼고 로컬 시각으로 파싱한다.
 */
export const parseServerLocalDateTime = (raw: string) => {
  const stripped = raw.endsWith('Z') ? raw.slice(0, -1) : raw;
  return new Date(stripped);
};
