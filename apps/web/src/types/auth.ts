import type { UserT } from './user';

export type SocialProviderT = 'kakao' | 'google' | 'apple';

export type PostSocialLoginResponseT = {
  accessToken: null;
  refreshToken: null;
  user: UserT;
};
