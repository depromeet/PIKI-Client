import { ChevronForwardIconFill, NotificationIconFill } from '@/assets/icons';

type Props = {
  onOpenNotificationSettings: () => void;
};

function PushDisabledBanner({ onOpenNotificationSettings }: Props) {
  return (
    <button
      type="button"
      onClick={onOpenNotificationSettings}
      className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-gray-75 px-4 py-4 text-left"
    >
      <div className="flex h-6 items-center gap-3">
        <NotificationIconFill className="size-6 text-icon-neutral-secondary" aria-hidden />
        <span className="body-2-medium text-text-neutral-secondary">
          휴대폰의 앱 알림이 꺼져있어요
        </span>
      </div>
      <ChevronForwardIconFill className="size-6 text-icon-neutral-secondary" aria-hidden />
    </button>
  );
}

export default PushDisabledBanner;
