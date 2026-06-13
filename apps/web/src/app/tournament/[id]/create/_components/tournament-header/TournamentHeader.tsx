'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ChevronBackwardIconFill } from '@/assets/icons/fill';

import ConfirmExitDialog from './ConfirmExitDialog';

type TournamentHeaderProps = {
  name: string;
  hasFriends: boolean;
};

function TournamentHeader({ name, hasFriends }: TournamentHeaderProps) {
  const router = useRouter();
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);

  const handleBackClick = () => {
    if (hasFriends) {
      setIsExitConfirmOpen(true);
      return;
    }
    router.back();
  };

  const handleConfirmExit = () => {
    setIsExitConfirmOpen(false);
    router.back();
  };

  return (
    <>
      <header className="relative flex h-7.5 w-full shrink-0 items-center">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={handleBackClick}
          className="cursor-pointer p-0.75"
        >
          <ChevronBackwardIconFill className="size-6 text-icon-neutral-secondary" />
        </button>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 title-1">
          {name}
        </h1>
      </header>

      <ConfirmExitDialog
        open={isExitConfirmOpen}
        onOpenChange={setIsExitConfirmOpen}
        onConfirm={handleConfirmExit}
      />
    </>
  );
}

export default TournamentHeader;
