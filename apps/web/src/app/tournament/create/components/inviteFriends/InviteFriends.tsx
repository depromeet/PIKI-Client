import { AddIconOutline } from '@/assets/icons';

function InviteFriends() {
  return (
    <div className="flex h-[66px] w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
      <div className="flex items-center gap-4">
        <div className="flex">
          <div className="h-[23px] w-[23px] rounded-full border-2 border-gray-500" />
          <div className="-ml-1 h-[23px] w-[23px] rounded-full border-2 border-gray-500" />
          <div className="-ml-1 h-[23px] w-[23px] rounded-full border-2 border-gray-500" />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="body-1-semibold">친구와 함께 담아보세요</p>
          <p className="caption-1-regular text-gray-600">친구 초대하기</p>
        </div>
      </div>
      <AddIconOutline className="h-6 w-6 text-gray-300" />
    </div>
  );
}

export default InviteFriends;
