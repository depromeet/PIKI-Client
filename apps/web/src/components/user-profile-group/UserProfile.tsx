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
        className={cn(
          'size-[27px] shrink-0 overflow-hidden rounded-full border-[1.6px] border-white object-cover',
          className
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        'flex size-[27px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.6px] border-white bg-bg-layer-default',
        className
      )}
      aria-label={user.name}
    >
      <SvgComponent className="size-full" />
    </span>
  );
}

export default UserProfile;
