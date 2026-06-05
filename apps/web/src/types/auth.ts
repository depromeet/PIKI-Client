import type { UserT } from './user';

export type SocialProviderT = 'kakao' | 'google';

export type PostSocialLoginResponseT = {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserT;
};
