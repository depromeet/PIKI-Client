'use client';

import Link from 'next/link';

import { useGetNotifications } from '@/app/notification/_hooks/useGetNotifications';
import { NotificationBadgeIconFill, NotificationIconFill } from '@/assets/icons/fill';
import { ROUTES } from '@/consts/route';
import { cn } from '@/utils/cn';

type AlarmHeaderIconProps = {
  className?: string;
  onClick?: () => void;
};

function AlarmHeaderIcon({ className, onClick }: AlarmHeaderIconProps) {
  const { unreadCount } = useGetNotifications();

  return (
    <Link
      href={ROUTES.NOTIFICATION}
      aria-label="알림"
      className={cn('cursor-pointer p-[3px]', className)}
      onClick={onClick}
    >
      {unreadCount > 0 ? (
        <NotificationBadgeIconFill className="size-6 text-icon-neutral-secondary" />
      ) : (
        <NotificationIconFill className="size-6 text-icon-neutral-secondary" />
      )}
    </Link>
  );
}

export default AlarmHeaderIcon;
