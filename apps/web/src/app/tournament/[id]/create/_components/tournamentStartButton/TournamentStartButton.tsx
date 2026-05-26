import Button from '@/components/common/button';

type TournamentStartButtonProps = {
  count: number;
};

function TournamentStartButton({ count }: TournamentStartButtonProps) {
  return (
    <Button variant="primary" size="lg" disabled={count < 2}>
      토너먼트 시작하기
    </Button>
  );
}

export default TournamentStartButton;
