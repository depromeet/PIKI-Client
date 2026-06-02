import type { UserT } from './user';

export type SocialProviderT = 'kakao' | 'google';

export type PostSocialLoginResponseT = {
  accessToken: null;
  refreshToken: null;
  user: UserT;
};
