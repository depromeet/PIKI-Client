import { ThreeDotHorizontalIconFill } from '@/assets/icons';
import StateChip from '@/components/common/state-chip';
import UserProfileGroup from '@/components/common/user-profile-group';
import type { UserT } from '@/components/common/user-profile-group/userProfileConstants';
import type { StateChipStyleProps } from '@/components/common/state-chip/StateChip.style';
import { cn } from '@/utils/cn';

type TournamentStateT = NonNullable<StateChipStyleProps['state']>;

type TournamentCardProps = {
  state: TournamentStateT;
  name: string;
  date: string;
  users: UserT[];
  maxProfiles?: number;
  className?: string;
  onMore?: () => void;
};

function TournamentCard({
  state,
  name,
  date,
  users,
  maxProfiles = 3,
  className,
  onMore,
}: TournamentCardProps) {
  return (
    <article
      className={cn('flex w-full flex-col gap-2 rounded-xl bg-bg-layer-default px-6 py-5', className)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <StateChip state={state} />
          <h3 className="heading-1 text-text-neutral-primary">{name}</h3>
        </div>
        <button type="button" aria-label="더보기" onClick={onMore}>
          <ThreeDotHorizontalIconFill className="size-6 text-icon-neutral-secondary" />
        </button>
      </div>
      <div className="flex items-end justify-between">
        <span className="body-2-medium text-text-neutral-tertiary">{date}</span>
        <UserProfileGroup users={users} max={maxProfiles} />
      </div>
    </article>
  );
}

export default TournamentCard;
