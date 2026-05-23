import { AddIconOutline } from '@/assets/icons';

function InviteFriends() {
  return (
    <div className="flex h-[66px] w-full items-center justify-between rounded-xl bg-base-50 px-4 py-3">
      <div className="flex items-center gap-4">
        <div className="flex">
          <div className="h-[27px] w-[27px] rounded-full border-2 border-gray-100" />
          <div className="-ml-1 h-[27px] w-[27px] rounded-full border-2 border-gray-100" />
          <div className="-ml-1 h-[27px] w-[27px] rounded-full border-2 border-gray-100" />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="body-1-semibold">친구와 함께 담아보세요</p>
        </div>
      </div>
      <AddIconOutline className="h-6 w-6 text-gray-300" />
    </div>
  );
}

export default InviteFriends;
