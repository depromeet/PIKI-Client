'use client';

import { useParams } from 'next/navigation';

import InviteFriends from './_components/inviteFriends/InviteFriends';
import TournamentHeader from './_components/tournamentHeader/TournamentHeader';
import TournamentStartButton from './_components/tournamentStartButton/TournamentStartButton';
import WishBasketCarousel from './_components/wishBasket/WishBasketCarousel';
import WishBasketStatus from './_components/wishBasketStatus/WishBasketStatus';
import { useGetTournament } from './_hooks/useGetTournament';

function TournamentCreatePage() {
  const { id: tournamentId } = useParams<{ id: string }>();

  const { tournamentData } = useGetTournament(tournamentId);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-1 flex-col gap-4 pt-[80px]">
        <TournamentHeader name={tournamentData.name} />
        <InviteFriends />
        <WishBasketStatus />
        <WishBasketCarousel items={tournamentData.pending?.items} tournamentId={tournamentId} />
      </div>
      <div className="pb-5">
        <TournamentStartButton count={0} />
      </div>
    </div>
  );
}

export default TournamentCreatePage;
