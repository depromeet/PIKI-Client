import NotificationIconFill from '@/assets/icons/fill/notification.svg';
import PersonIconFill from '@/assets/icons/fill/person.svg';

function HeaderActions() {
  return (
    <div className="flex items-center">
      {/* TODO: 알림 페이지 연결 */}
      <button
        type="button"
        aria-label="알림"
        className="flex h-[48px] w-[48px] items-center justify-center p-[10px] text-gray-300"
      >
        <NotificationIconFill width={24} height={24} className="shrink-0" />
      </button>
      {/* TODO: 마이페이지 연결 */}
      <button
        type="button"
        aria-label="마이페이지"
        className="flex h-[48px] w-[48px] items-center justify-center p-3 text-gray-300"
      >
        <PersonIconFill width={30} height={30} className="shrink-0" />
      </button>
    </div>
  );
}

export default HeaderActions;
