import Image from 'next/image';

import { cn } from '@/utils/cn';

import { PROFILE_SVG, type UserT } from './userProfile.const';

type UserProfileProps = {
  user: UserT;
  className?: string;
};

function UserProfile({ user, className }: UserProfileProps) {
  const SvgComponent = PROFILE_SVG[user.profileType];

  if (user.imageUrl) {
    return (
      <Image
        src={user.imageUrl}
        alt={user.name ?? '사용자 프로필'}
        width={27}
        height={27}
        className={cn('size-[27px] rounded-full border-[1.6px] border-white', className)}
      />
    );
  }

  return <SvgComponent className={cn('size-[27px]', className)} aria-label={user.name} />;
}

export default UserProfile;
