export const formatTimeKo = (dateString: string) =>
  new Date(dateString).toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

/**
 * 서버 응답의 ISO 8601 시각 문자열을 Date 로 파싱한다.
 *
 * 백엔드가 `Z`(UTC) 접미사 포함한 정상 ISO 형식으로 보내므로 `new Date()` 가 올바르게 로컬 시각으로 변환한다.
 *
 * NOTE: 과거 백엔드 변형 시 LocalDateTime 을 시간대 없이 Z 만 붙여 보내 9시간 어긋나던 시기가 있어
 * Z 를 떼는 처리가 들어갔었으나, 현재는 정상 UTC 형식으로 통일됐다.
 */
export const parseServerLocalDateTime = (raw: string) => new Date(raw);
