'use client';

import { Header, HeaderIcon } from '@/components/header';
import Spacing from '@/components/spacing';
import { formatTimeKo } from '@/utils/formatDate';
import { isWebview } from '@/utils/webBridge';

import { useGetNotifications } from '../_hooks/useGetNotifications';
import { usePushPermission } from '../_hooks/usePushPermission';
import NotificationEmptyState from './NotificationEmptyState';
import NotificationItem from './NotificationItem';
import PushDisabledBanner from './PushDisabledBanner';

function NotificationContent() {
  const { openNotificationSettings, isPushEnabled } = usePushPermission();
  const { notificationsData, isPending } = useGetNotifications();
  const isEmpty = !isPending && notificationsData.length === 0;

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
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationContent;
