'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { ChevronBackwardIconFill } from '@/assets/icons/fill';

import { useGetTournament } from '../../../_common/_hooks/useGetTournament';
import ConfirmExitDialog from './ConfirmExitDialog';

type TournamentHeaderProps = {
  name: string;
};

function TournamentHeader({ name }: TournamentHeaderProps) {
  const router = useRouter();
  const { id: tournamentId } = useParams<{ id: string }>();
  const { tournamentData } = useGetTournament(Number(tournamentId));
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);

  const pending = 'pending' in tournamentData ? tournamentData.pending : null;
  const hasFriends = (pending?.participants.length ?? 0) > 1;

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
