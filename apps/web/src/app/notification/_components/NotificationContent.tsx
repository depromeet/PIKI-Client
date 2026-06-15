'use client';

import { useRouter } from 'next/navigation';

import { Header, HeaderIcon } from '@/components/header';
import Spacing from '@/components/spacing';
import { formatTimeKo } from '@/utils/formatDate';
import { isWebview } from '@/utils/webBridge';

import { useGetNotifications } from '../_hooks/useGetNotifications';
import useIntersectionObserver from '../_hooks/useIntersectionObserver';
import { usePostNotificationsRead } from '../_hooks/usePostNotificationsRead';
import { usePushPermission } from '../_hooks/usePushPermission';
import { getNotificationRoute } from '../_utils/getNotificationRoute';
import NotificationEmptyState from './NotificationEmptyState';
import NotificationItem from './NotificationItem';
import PushDisabledBanner from './PushDisabledBanner';

function NotificationContent() {
  const router = useRouter();
  const { openNotificationSettings, isPushEnabled } = usePushPermission();
  const { notificationsData, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetNotifications();
  const { postNotificationsReadMutation } = usePostNotificationsRead();
  const isEmpty = !isPending && notificationsData.length === 0;

  const bottomRef = useIntersectionObserver(fetchNextPage, !!hasNextPage && !isFetchingNextPage);

  const handleNotificationClick = (notification: (typeof notificationsData)[number]) => {
    const route = getNotificationRoute(notification.type, notification.refId, {
      kind: notification.kind,
      tournamentId: notification.tournamentId,
    });
    postNotificationsReadMutation({ ids: [notification.id] });
    if (route) router.push(route);
  };

  return (
    <div className="flex h-dvh flex-col bg-gray-50 px-7 pt-20">
      <Header left={<HeaderIcon name="BACK" />} center="알림 히스토리" centerClassName="title-1" />
      <Spacing size={16} />

      <div className="hide-scrollbar flex-1 overflow-y-auto pt-5">
        {isEmpty ? (
          <NotificationEmptyState onOpenNotificationSettings={openNotificationSettings} />
        ) : (
          <div className="flex flex-col gap-4 pb-9">
            {isWebview() && isPushEnabled === false && (
              <PushDisabledBanner onOpenNotificationSettings={openNotificationSettings} />
            )}

            <div className="rounded-xl bg-base-50">
              <ul className="divide-y divide-gray-100 px-5">
                {notificationsData.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    message={notification.title}
                    time={formatTimeKo(notification.createdAt)}
                    profileImage={notification.imageUrl}
                    isRead={notification.isRead}
                    onClick={() => handleNotificationClick(notification)}
                  />
                ))}
              </ul>
            </div>
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationContent;
