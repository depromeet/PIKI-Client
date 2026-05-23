import InviteFriends from './components/inviteFriends/InviteFriends';
import TournamentHeader from './components/tournamentHeader/TournamentHeader';
import TournamentStartButton from './components/tournamentStartButton/TournamentStartButton';
import WishBasketCarousel from './components/wishBasket/WishBasketCarousel';
import WishBasketStatus from './components/wishBasketStatus/WishBasketStatus';

function TournamentCreatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 px-5">
      <div className="flex flex-1 flex-col gap-4 pt-[80px]">
        <TournamentHeader />
        <InviteFriends />
        <WishBasketStatus />
        <WishBasketCarousel />
      </div>
      <div className="pb-8">
        <TournamentStartButton count={0} />
      </div>
    </div>
  );
}

export default TournamentCreatePage;
