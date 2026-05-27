'use client';

import Button from '@/components/common/button';

import { usePostTournamentStart } from '../../_hooks/usePostTournamentStart';

type TournamentStartButtonProps = {
  count: number;
  tournamentId: string;
};

function TournamentStartButton({ count, tournamentId }: TournamentStartButtonProps) {
  const { startTournament, isPending } = usePostTournamentStart(tournamentId);

  return (
    <Button
      variant="primary"
      size="lg"
      disabled={count < 2 || isPending}
      onClick={() => startTournament()}
    >
      토너먼트 시작하기
    </Button>
  );
}

export default TournamentStartButton;
