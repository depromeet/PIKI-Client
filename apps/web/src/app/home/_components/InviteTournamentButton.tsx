'use client';

import { useState } from 'react';

import { LoginIconOutline } from '@/assets/icons';

import InviteCodeDialog from './invite-code-dialog/InviteCodeDialog';

function InviteTournamentButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="flex h-[54px] w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-bg-layer-default px-9"
      >
        <LoginIconOutline className="size-6 text-icon-neutral-secondary" />
        <span className="body-1-semibold text-text-neutral-primary">초대 토너먼트 입장</span>
      </button>

      <InviteCodeDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

export default InviteTournamentButton;
