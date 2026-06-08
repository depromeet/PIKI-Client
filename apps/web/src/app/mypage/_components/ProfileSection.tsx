'use client';

import Image from 'next/image';
import Link from 'next/link';

import { EditIconFill } from '@/assets/icons';
import UserProfileBlue from '@/assets/images/user-profile-blue.svg';
import { ROUTES } from '@/consts/route';
import { useGetMe } from '@/hooks/useGetMe';

function ProfileSection() {
  const { userData } = useGetMe();

  return (
    <section className="flex w-full flex-col gap-3">
      <h2 className="body-1-bold text-text-neutral-primary">프로필</h2>

      <div className="flex items-center gap-4 rounded-xl bg-bg-layer-default p-5">
        <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
          {userData.profileImage ? (
            <Image
              src={userData.profileImage}
              alt={`${userData.nickname} 프로필 이미지`}
              fill
              className="object-cover"
              sizes="32px"
            />
          ) : (
            <UserProfileBlue className="size-full" aria-hidden />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate body-1-bold text-text-neutral-primary">{userData.nickname}</p>
          {userData.identityType === 'MEMBER' && (
            <p className="truncate body-2-medium text-text-neutral-tertiary">{userData.email}</p>
          )}
        </div>

        <Link
          href={ROUTES.MYPAGE_EDIT}
          aria-label="프로필 수정"
          className="shrink-0 cursor-pointer"
        >
          <EditIconFill className="size-6 text-icon-neutral-secondary" />
        </Link>
      </div>
    </section>
  );
}

export default ProfileSection;
