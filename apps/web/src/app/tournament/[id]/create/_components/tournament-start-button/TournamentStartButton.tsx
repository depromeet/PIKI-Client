'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/button';

import { usePostTournamentStart } from '../../_hooks/usePostTournamentStart';
import ConfirmStartDialog from './ConfirmStartDialog';

const PARTICIPANT_TOOLTIP_DURATION_MS = 3_000;

type TournamentStartButtonProps = {
  count: number;
  tournamentId: string;
  hasUnreadyItem: boolean;
  hasFriends: boolean;
  isWaitingForOwnerStart: boolean;
  isDepositClosed?: boolean;
  isParticipant?: boolean;
};

function TournamentStartButton({
  count,
  tournamentId,
  hasUnreadyItem,
  hasFriends,
  isWaitingForOwnerStart,
  isDepositClosed = false,
  isParticipant = false,
}: TournamentStartButtonProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { postTournamentStartMutation, isPostTournamentStartPending } = usePostTournamentStart(
    Number(tournamentId)
  );

  const [isTooltipVisible, setIsTooltipVisible] = useState(isWaitingForOwnerStart);

  useEffect(() => {
    if (!isWaitingForOwnerStart) return;
    const timeoutId = window.setTimeout(
      () => setIsTooltipVisible(false),
      PARTICIPANT_TOOLTIP_DURATION_MS
    );
    return () => window.clearTimeout(timeoutId);
  }, [isWaitingForOwnerStart]);

  const startTournament = () => postTournamentStartMutation();

  const handleClick = () => {
    if (isWaitingForOwnerStart) return;
    // 참여자는 본인 CLONE 만 만드는 거라 "담지 못한 친구" 안내가 필요 없음 — 바로 시작
    if (isParticipant) {
      startTournament();
      return;
    }
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
    isWaitingForOwnerStart || (!isDepositClosed && (count < 2 || hasUnreadyItem));

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

      <Button
        variant="primary"
        size="lg"
        disabled={isDisabled}
        isLoading={isPostTournamentStartPending}
        onClick={handleClick}
      >
        토너먼트 시작하기
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
