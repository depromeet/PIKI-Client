export const CODE_LENGTH = 6;

const VALID_INVITE_CODE = '111111';
const MOCK_TOURNAMENT_ID = 1;

/** 영문 + 숫자 6자리 (mock 단계에서는 '111111'도 허용) */
const CODE_FORMAT_PATTERN = /^[A-Za-z0-9]{6}$/;

export type VerifyInviteCodeResultT =
  | { ok: true; tournamentId: number }
  | { ok: false; reason: 'INVALID_FORMAT' | 'NOT_FOUND' };

/**
 * 초대 코드 검증 (mock).
 * 형식 위반과 코드 불일치를 구분 반환.
 * TODO: API 연동 후 서버 응답으로 교체.
 */
export const verifyInviteCode = (code: string): VerifyInviteCodeResultT => {
  if (!CODE_FORMAT_PATTERN.test(code)) return { ok: false, reason: 'INVALID_FORMAT' };
  if (code.toLowerCase() === VALID_INVITE_CODE) {
    return { ok: true, tournamentId: MOCK_TOURNAMENT_ID };
  }
  return { ok: false, reason: 'NOT_FOUND' };
};
