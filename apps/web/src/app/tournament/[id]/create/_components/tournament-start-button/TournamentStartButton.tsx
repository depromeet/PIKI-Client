'use client';

import Button from '@/components/button';

import { usePostTournamentStart } from '../../_hooks/usePostTournamentStart';

type TournamentStartButtonProps = {
  count: number;
  tournamentId: string;
  hasUnreadyItem: boolean;
};

function TournamentStartButton({
  count,
  tournamentId,
  hasUnreadyItem,
}: TournamentStartButtonProps) {
  const { postTournamentStartMutation, isPostTournamentStartPending } = usePostTournamentStart(
    Number(tournamentId)
  );

  return (
    <Button
      variant="primary"
      size="lg"
      disabled={count < 2 || hasUnreadyItem}
      isLoading={isPostTournamentStartPending}
      onClick={() => postTournamentStartMutation()}
    >
      토너먼트 시작하기
    </Button>
  );
}

export default TournamentStartButton;
