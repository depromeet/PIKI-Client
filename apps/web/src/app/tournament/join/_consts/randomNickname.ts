import type { ProfileTypeT } from '@/components/common/user-profile-group/userProfile.const';

export type RandomNicknameT = {
  nickname: string;
  profileType: ProfileTypeT;
};

/**
 * 랜덤 닉네임 후보 (mock).
 * API 연동 후 서버에서 발급받은 닉네임으로 교체.
 */
export const RANDOM_NICKNAMES: RandomNicknameT[] = [
  { nickname: '지친 루피', profileType: 'yellow' },
  { nickname: '게으른 사자', profileType: 'blue' },
  { nickname: '행복한 토끼', profileType: 'yellow' },
  { nickname: '활기찬 강쥐', profileType: 'blue' },
  { nickname: '느긋한 키티', profileType: 'yellow' },
];

export const DEFAULT_RANDOM_NICKNAME = RANDOM_NICKNAMES[0]!;
