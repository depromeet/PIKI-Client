'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/common/button';
import Spinner from '@/components/common/spinner';

import { useGetTournament } from '../../_hooks/useGetTournament';
import { usePostTournamentStart } from '../../_hooks/usePostTournamentStart';
import ConfirmStartDialog from './ConfirmStartDialog';

const PARTICIPANT_TOOLTIP_DURATION_MS = 3_000;

type TournamentStartButtonProps = {
  count: number;
  tournamentId: string;
  hasUnreadyItem: boolean;
  isDepositClosed?: boolean;
  isParticipant?: boolean;
};

function TournamentStartButton({
  count,
  tournamentId,
  hasUnreadyItem,
  isDepositClosed = false,
  isParticipant = false,
}: TournamentStartButtonProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(isParticipant);
  const { tournamentData } = useGetTournament(Number(tournamentId));
  const { postTournamentStartMutation, isPostTournamentStartPending } = usePostTournamentStart(
    Number(tournamentId)
  );

  useEffect(() => {
    if (!isParticipant) return;
    const timeoutId = window.setTimeout(
      () => setIsTooltipVisible(false),
      PARTICIPANT_TOOLTIP_DURATION_MS
    );
    return () => window.clearTimeout(timeoutId);
  }, [isParticipant]);

  const hasFriends = (tournamentData.pending?.participants.length ?? 0) > 1;

  const startTournament = () => postTournamentStartMutation();

  const handleClick = () => {
    if (isParticipant) return;
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

  const isDisabled =
    isParticipant ||
    isPostTournamentStartPending ||
    (!isDepositClosed && (count < 2 || hasUnreadyItem));

  return (
    <>
      {isTooltipVisible && (
        <div className="flex justify-center">
          <span className="relative inline-flex items-center rounded-md bg-gray-700 px-3 py-2 caption-1-regular text-text-neutral-inverse">
            주최자가 시작해야 플레이 할 수 있어요
            <span
              aria-hidden
              className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-gray-700"
            />
          </span>
        </div>
      )}

      <Button variant="primary" size="lg" disabled={isDisabled} onClick={handleClick}>
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
