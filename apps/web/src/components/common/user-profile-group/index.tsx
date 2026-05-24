import { cn } from '@/utils/cn';

import UserProfile from './UserProfile';
import type { UserT } from './userProfileConstants';

type UserProfileGroupProps = {
  users: UserT[];
  /** 보여줄 최대 프로필 수. 초과 시 +N 뱃지로 표시 */
  max?: number;
  className?: string;
};

function UserProfileGroup({ users, max = 3, className }: UserProfileGroupProps) {
  const visibleUsers = users.slice(0, max);
  const overflowCount = users.length - max;

  return (
    <div className={cn('flex items-center', className)}>
      {visibleUsers.map((user, index) => (
        <UserProfile
          key={user.id}
          user={user}
          className={index === visibleUsers.length - 1 && overflowCount === 0 ? '' : '-mr-2'}
        />
      ))}
      {overflowCount > 0 && (
        <span
          className="flex size-[27px] shrink-0 items-center justify-center rounded-full border-[1.6px] border-white bg-gray-50 body-2-semibold text-text-neutral-tertiary"
          aria-label={`외 ${overflowCount}명`}
        >
          +{overflowCount}
        </span>
      )}
    </div>
  );
}

export default UserProfileGroup;
