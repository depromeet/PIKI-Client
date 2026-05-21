import Button from '@/components/common/Button/Button';

import InviteFriends from './components/inviteFriends/InviteFriends';
import TournamentHeader from './components/tournamentHeader/TournamentHeader';
import WishBasket from './components/wishBasket/WishBasket';

function TournamentCreatePage() {
  return (
    <div className="flex min-h-screen flex-col px-5">
      <div className="flex flex-1 flex-col gap-4 pt-[80px]">
        <TournamentHeader />
        <InviteFriends />
        <WishBasket />
      </div>
      <div className="pb-8">
        <Button variant="primary" size="lg">
          토너먼트 시작하기
        </Button>
      </div>
    </div>
  );
}

export default TournamentCreatePage;
