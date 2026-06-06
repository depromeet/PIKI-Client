'use client';

import Button from '@/components/button';
import Spinner from '@/components/spinner';

import { usePostTournamentStart } from '../../_hooks/usePostTournamentStart';

type TournamentStartButtonProps = {
  count: number;
  tournamentId: number;
  hasUnreadyItem: boolean;
};

function TournamentStartButton({
  count,
  tournamentId,
  hasUnreadyItem,
}: TournamentStartButtonProps) {
  const { postTournamentStartMutation, isPostTournamentStartPending } =
    usePostTournamentStart(tournamentId);

  return (
    <Button
      variant="primary"
      size="lg"
      disabled={count < 2 || isPostTournamentStartPending || hasUnreadyItem}
      onClick={() => postTournamentStartMutation()}
    >
      {isPostTournamentStartPending ? <Spinner size={20} /> : '토너먼트 시작하기'}
    </Button>
  );
}

export default TournamentStartButton;
