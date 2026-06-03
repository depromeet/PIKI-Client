type VerifyInviteCodeResultT = { ok: true; tournamentId: number } | { ok: false };

export const CODE_LENGTH = 6;

const VALID_INVITE_CODE = '111111';
const MOCK_TOURNAMENT_ID = 1;

/**
 * 초대 코드 검증 (mock).
 * 6글자 alphanumeric. API 연동 후 `postTournamentInvite` 호출로 교체.
 */
export const verifyInviteCode = (code: string): VerifyInviteCodeResultT => {
  if (code.toLowerCase() === VALID_INVITE_CODE) {
    return { ok: true, tournamentId: MOCK_TOURNAMENT_ID };
  }
  return { ok: false };
};
