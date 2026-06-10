'use client';

import { Header, HeaderIcon } from '@/components/header';
import Spacing from '@/components/spacing';
import { isWebview } from '@/utils/webBridge';

import { usePushPermission } from '../_hooks/usePushPermission';
import NotificationEmptyState from './NotificationEmptyState';
import NotificationItem from './NotificationItem';
import PushDisabledBanner from './PushDisabledBanner';

// TODO: API 연동 시 제거
const MOCK_NOTIFICATIONS = [
  { id: 1, message: '배부른 사자님이 아이템을 추가했어요', time: '오전 11:25' },
  { id: 2, message: '맛있는 캔디님이 아이템을 추가했어요', time: '오전 11:25' },
  { id: 3, message: '졸린 호랑이님이 새 아이템을 담았어요', time: '오전 11:25' },
  { id: 4, message: '노는 원숭이님의 토너먼트에 신입 등장', time: '오전 11:25' },
];

function NotificationContent() {
  const notifications = MOCK_NOTIFICATIONS;
  const isEmpty = notifications.length === 0;

  const { openNotificationSettings, isPushEnabled } = usePushPermission();

  return (
    <div className="flex h-dvh flex-col px-5 pt-9">
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
                {notifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    message={notification.message}
                    time={notification.time}
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
