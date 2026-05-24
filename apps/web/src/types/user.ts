/** 유저 식별 타입: GUEST(비회원), MEMBER(회원) */
export type UserIdentityTypeT = 'GUEST' | 'MEMBER';

/** 유저 정보 */
export type UserT = {
  /** 유저 ID */
  id: string;
  /** 유저 닉네임 */
  nickname: string;
  /** 유저 프로필 이미지 URL */
  profileImage: string;
  /** 유저 식별 타입 */
  identityType: UserIdentityTypeT;
};
