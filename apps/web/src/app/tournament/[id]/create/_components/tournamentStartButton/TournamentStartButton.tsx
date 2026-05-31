'use client';

import Button from '@/components/common/button';
import Spinner from '@/components/common/spinner';

import { usePostTournamentStart } from '../../_hooks/usePostTournamentStart';

type TournamentStartButtonProps = {
  count: number;
  tournamentId: string;
};

function TournamentStartButton({ count, tournamentId }: TournamentStartButtonProps) {
  const { postTournamentStartMutation, isPostTournamentStartPending } =
    usePostTournamentStart(Number(tournamentId));

  return (
    <Button
      variant="primary"
      size="lg"
      disabled={count < 2 || isPostTournamentStartPending}
      onClick={() => postTournamentStartMutation()}
    >
      {isPostTournamentStartPending ? <Spinner size={20} /> : '토너먼트 시작하기'}
    </Button>
  );
}

export default TournamentStartButton;
