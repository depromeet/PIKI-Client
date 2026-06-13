import UserProfile from '@/components/user-profile-group/UserProfile';
import type { UserT } from '@/components/user-profile-group/userProfile.const';

type ParticipantChipProps = {
  user: UserT;
  itemCount: number;
};

function ParticipantChip({ user, itemCount }: ParticipantChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-neutral-muted bg-bg-layer-default py-1 pr-3 pl-1 body-2-medium text-text-neutral-primary">
      <UserProfile user={user} className="border-0" />
      <span>{user.name ?? '익명'}</span>
      <span className="body-2-semibold text-text-neutral-secondary">{itemCount}개</span>
    </span>
  );
}

export default ParticipantChip;
