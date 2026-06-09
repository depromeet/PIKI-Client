export const CODE_LENGTH = 6;

/** 영문 대문자 3 + 숫자 3 — 서버 정의 패턴 [A-Z]{3}\d{3} */
const CODE_FORMAT_PATTERN = /^[A-Z]{3}\d{3}$/;

/**
 * 클라이언트 형식 검증.
 * 통과 시 서버에 `getInvitePreviewByCode` 호출로 실 검증 위임.
 */
export const isValidInviteCodeFormat = (code: string) => CODE_FORMAT_PATTERN.test(code);
