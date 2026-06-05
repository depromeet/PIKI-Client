import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';

import ChevronForwardIcon from '@/assets/icons/fill/chevron-forward.svg';
import NotificationIconFill from '@/assets/icons/fill/notification.svg';

function PushDisabledBanner() {
  const handleOpenNotificationSettings = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: WEBBRIDGE_MESSAGE_TYPE.OPEN_NOTIFICATION_SETTINGS })
    );
  };
  return (
    <div className="flex items-center justify-between rounded-2xl bg-gray-75 px-4 py-4">
      <div className="flex h-6 items-center gap-3">
        <NotificationIconFill className="size-6 text-icon-neutral-secondary" aria-hidden />
        <span className="body-2-medium text-text-neutral-secondary">
          휴대폰의 앱 알림이 꺼져있어요
        </span>
      </div>
      <ChevronForwardIcon
        onClick={handleOpenNotificationSettings}
        className="size-6 cursor-pointer text-icon-neutral-secondary"
        aria-hidden
      />
    </div>
  );
}

export default PushDisabledBanner;
