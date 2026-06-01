import { Header, HeaderIcon } from '@/components/common/header';
import Spacing from '@/components/common/spacing';

import NotificationEmptyState from './_components/NotificationEmptyState';
import NotificationItem from './_components/NotificationItem';
import PushDisabledBanner from './_components/PushDisabledBanner';

// TODO: API 연동 시 제거
const MOCK_NOTIFICATIONS = [
  { id: 1, message: '배부른 사자님이 아이템을 추가했어요', time: '오전 11:25' },
  { id: 2, message: '맛있는 캔디님이 아이템을 추가했어요', time: '오전 11:25' },
  { id: 3, message: '졸린 호랑이님이 새 아이템을 담았어요', time: '오전 11:25' },
  { id: 4, message: '노는 원숭이님의 토너먼트에 신입 등장', time: '오전 11:25' },
];

// TODO: API 연동 시 실제 데이터로 교체
const notifications = MOCK_NOTIFICATIONS;
const isPushEnabled = false; /* 앱 알림 권한 여부 */

function Notification() {
  const isEmpty = notifications.length === 0;

  return (
    <div className="flex h-dvh flex-col pt-9">
      <Header left={<HeaderIcon name="BACK" />} center="알림 히스토리" centerClassName="title-1" />
      <Spacing size={16} />

      <div className="hide-scrollbar flex-1 overflow-y-auto pt-5">
        {isEmpty ? (
          <NotificationEmptyState />
        ) : (
          <div className="flex flex-col gap-4 pb-9">
            {!isPushEnabled && <PushDisabledBanner />}
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

export default Notification;
