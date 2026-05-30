'use client';

import { useGetTournament } from './_hooks/useGetTournament';
import InviteFriends from './_components/inviteFriends/InviteFriends';
import TournamentHeader from './_components/tournamentHeader/TournamentHeader';
import TournamentStartButton from './_components/tournamentStartButton/TournamentStartButton';
import TournamentItemBasketCarousel from './_components/tournamentItemBasket/TournamentItemBasketCarousel';
import TournamentItemBasketStatus from './_components/tournamentItemBasketStatus/TournamentItemBasketStatus';

type TournamentCreateClientProps = {
  tournamentId: string;
};

function TournamentCreateClient({ tournamentId }: TournamentCreateClientProps) {
  const { tournamentData } = useGetTournament(tournamentId);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-1 flex-col gap-4 pt-[80px]">
        <TournamentHeader name={tournamentData.name} />
        <InviteFriends />
        <TournamentItemBasketStatus />
        <TournamentItemBasketCarousel items={tournamentData.pending?.items} />
      </div>
      <div className="pb-8">
        <TournamentStartButton
          count={tournamentData.pending?.items.length ?? 0}
          tournamentId={tournamentId}
        />
      </div>
    </div>
  );
}

export default TournamentCreateClient;
