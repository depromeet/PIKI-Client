'use client';

import Link from 'next/link';

import { ChevronForwardIconFill } from '@/assets/icons/fill';
import UserProfileGroup from '@/components/user-profile-group';
import type { UserT } from '@/components/user-profile-group/userProfile.const';
import { ROUTES } from '@/consts/route';

type GroupResultEntryCardProps = {
  tournamentId: number;
};

// TODO: 백엔드가 completed 응답에 participants 를 내려주면 그것으로 교체.
// 현재는 시안 일치를 위해 placeholder 아바타 3개로 표시한다.
const PLACEHOLDER_USERS: UserT[] = [
  { id: 'placeholder-1', profileType: 'blue' },
  { id: 'placeholder-2', profileType: 'yellow' },
  { id: 'placeholder-3', profileType: 'blue' },
];

function GroupResultEntryCard({ tournamentId }: GroupResultEntryCardProps) {
  return (
    <Link
      href={ROUTES.TOURNAMENT_GROUP_RESULT(tournamentId)}
      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl bg-bg-layer-default px-4 py-3 shadow-[0px_2px_4px_rgba(0,0,0,0.08)]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <UserProfileGroup users={PLACEHOLDER_USERS} max={3} />
        <p className="truncate body-1-semibold text-text-neutral-primary">친구 토너먼트 결과보기</p>
      </div>
      <ChevronForwardIconFill className="size-5 shrink-0 text-icon-neutral-secondary" />
    </Link>
  );
}

export default GroupResultEntryCard;
