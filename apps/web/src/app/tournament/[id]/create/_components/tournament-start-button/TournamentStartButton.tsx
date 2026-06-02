'use client';

import { useState } from 'react';

import Button from '@/components/common/button';
import Spinner from '@/components/common/spinner';

import { usePostTournamentStart } from '../../_hooks/usePostTournamentStart';
import ConfirmStartDialog from './ConfirmStartDialog';

type TournamentStartButtonProps = {
  count: number;
  tournamentId: string;
  hasUnreadyItem: boolean;
  hasFriends: boolean;
};

function TournamentStartButton({
  count,
  tournamentId,
  hasUnreadyItem,
  hasFriends,
}: TournamentStartButtonProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { postTournamentStartMutation, isPostTournamentStartPending } = usePostTournamentStart(
    Number(tournamentId)
  );

  const startTournament = () => postTournamentStartMutation();

  const handleClick = () => {
    if (hasFriends) {
      setIsConfirmOpen(true);
      return;
    }
    startTournament();
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    startTournament();
  };

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        disabled={count < 2 || isPostTournamentStartPending || hasUnreadyItem}
        onClick={handleClick}
      >
        {isPostTournamentStartPending ? <Spinner size={20} /> : '토너먼트 시작하기'}
      </Button>

      <ConfirmStartDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default TournamentStartButton;
