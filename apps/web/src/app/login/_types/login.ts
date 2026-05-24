import type { UserT } from '@/types/user';

export type PostLoginResponseT = {
  accessToken: string;
  refreshToken: string;
  user: UserT;
};
