'use client';

import Link from 'next/link';

import { ChevronForwardIconFill } from '@/assets/icons/fill';
import { ROUTES } from '@/consts/route';

type GroupResultEntryCardProps = {
  tournamentId: number;
};

function GroupResultEntryCard({ tournamentId }: GroupResultEntryCardProps) {
  return (
    <Link
      href={ROUTES.TOURNAMENT_GROUP_RESULT(tournamentId)}
      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl bg-bg-layer-default px-4 py-3 shadow-[0px_2px_4px_rgba(0,0,0,0.08)]"
    >
      <p className="truncate body-1-semibold text-text-neutral-primary">친구 토너먼트 결과보기</p>
      <ChevronForwardIconFill className="size-5 shrink-0 text-icon-neutral-secondary" />
    </Link>
  );
}

export default GroupResultEntryCard;
