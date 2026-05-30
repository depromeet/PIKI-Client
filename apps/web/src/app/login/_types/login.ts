import type { UserT } from '@/types/user';

export type PostGuestLoginResponseT = {
  /** 웹 - null, 웹뷰 - string */
  accessToken: string | null;
  /** 웹 - null, 웹뷰 - string */
  refreshToken: string | null;
  user: UserT;
};

export type PostMemberLoginResponseT = {
  accessToken: null;
  refreshToken: null;
  user: UserT;
};
