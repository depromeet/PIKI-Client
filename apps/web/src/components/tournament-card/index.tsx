import StatusChip from '@/components/status-chip';
import UserProfileGroup from '@/components/user-profile-group';
import type { UserT } from '@/components/user-profile-group/userProfile.const';
import type { TournamentStatusT } from '@/types/tournament';
import { cn } from '@/utils/cn';

import type { FriendListItemT } from './FriendListDialog';
import MorePopover from './MorePopover';

type TournamentCardProps = {
  tournamentId: number;
  status: TournamentStatusT;
  name: string;
  date: string;
  users: UserT[];
  maxProfiles?: number;
  /** 더보기 → 친구 목록 보기 메뉴에서 사용. 비어있으면 메뉴 미노출. */
  friends?: FriendListItemT[];
  className?: string;
};

function TournamentCard({
  tournamentId,
  status,
  name,
  date,
  users,
  maxProfiles = 3,
  friends,
  className,
}: TournamentCardProps) {
  return (
    <article
      className={cn(
        'flex w-full flex-col gap-2 rounded-xl bg-bg-layer-default px-6 py-5',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <StatusChip status={status} />
          <h3 className="heading-1 text-text-neutral-primary">{name}</h3>
        </div>
        <MorePopover status={status} tournamentId={tournamentId} friends={friends} />
      </div>
      <div className="flex items-end justify-between">
        <span className="body-2-medium text-text-neutral-tertiary">{date}</span>
        <UserProfileGroup users={users} max={maxProfiles} />
      </div>
    </article>
  );
}

export default TournamentCard;
