'use client';

import { useState } from 'react';

import { AddIconOutline } from '@/assets/icons';

import InviteFriendsDialog from './InviteFriendsDialog';

function InviteFriends() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsInviteDialogOpen(true)}
        className="flex h-16.5 w-full cursor-pointer items-center justify-between rounded-xl bg-base-50 px-4 py-3"
      >
        <div className="flex items-center gap-4">
          <div className="flex">
            <div className="h-6.75 w-6.75 rounded-full border-2 border-gray-100" />
            <div className="-ml-1 h-6.75 w-6.75 rounded-full border-2 border-gray-100" />
            <div className="-ml-1 h-6.75 w-6.75 rounded-full border-2 border-gray-100" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="body-1-semibold">친구와 함께 담아보세요</p>
          </div>
        </div>
        <AddIconOutline className="h-6 w-6 text-gray-300" />
      </button>

      <InviteFriendsDialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen} />
    </>
  );
}

export default InviteFriends;
