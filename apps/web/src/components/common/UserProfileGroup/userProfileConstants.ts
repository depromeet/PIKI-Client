import UserProfileBlue from '@/assets/images/user-profile-blue.svg';
import UserProfileYellow from '@/assets/images/user-profile-yellow.svg';

export type ProfileTypeT = 'blue' | 'yellow';

export type UserT = {
  id: string | number;
  name?: string;
  profileType: ProfileTypeT;
  imageUrl?: string;
};

export const PROFILE_SVG: Record<ProfileTypeT, typeof UserProfileBlue> = {
  blue: UserProfileBlue,
  yellow: UserProfileYellow,
};
