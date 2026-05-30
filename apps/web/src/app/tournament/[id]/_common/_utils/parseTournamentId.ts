/**
 * URL path param의 `[id]`를 양수 정수 토너먼트 ID로 파싱한다.
 * 유효하지 않으면 null.
 */
export const parseTournamentId = (raw: string): number | null => {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
};
