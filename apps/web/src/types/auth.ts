import type { UserT } from './user';

export type SocialProviderT = 'kakao' | 'google' | 'apple';

export type PostSocialLoginResponseT = {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserT;
};
