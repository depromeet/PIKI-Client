import Button from '@/components/common/Button/Button';

import InviteFriends from './components/inviteFriends/InviteFriends';
import TournamentHeader from './components/tournamentHeader/TournamentHeader';
import WishBasket from './components/wishBasket/WishBasket';

function TournamentCreatePage() {
  return (
    <>
      <TournamentHeader />
      <InviteFriends />
      <WishBasket />
      <Button variant="primary" size="lg">
        토너먼트 시작하기
      </Button>
    </>
  );
}

export default TournamentCreatePage;
