'use client';

import Spacing from '@/components/common/spacing';

import { useGetTournament } from '../_hooks/useGetTournament';
import InviteFriends from './inviteFriends/InviteFriends';
import TournamentHeader from './tournamentHeader/TournamentHeader';
import TournamentItemBasketCarousel from './tournamentItemBasket/TournamentItemBasketCarousel';
import TournamentItemBasketStatus from './tournamentItemBasketStatus/TournamentItemBasketStatus';
import TournamentStartButton from './tournamentStartButton/TournamentStartButton';

type TournamentCreateClientProps = {
  tournamentId: string;
};

function TournamentCreateClient({ tournamentId }: TournamentCreateClientProps) {
  const { tournamentData } = useGetTournament(Number(tournamentId));

  return (
    <div className="bg-layer-basement flex h-dvh min-h-0 flex-col pt-20 pb-8">
      <TournamentHeader name={tournamentData.name} />
      <Spacing size={16} />
      <InviteFriends />
      <Spacing size={16} />
      <TournamentItemBasketStatus />

      <TournamentItemBasketCarousel items={tournamentData.pending?.items} />

      <div className="shrink-0">
        <TournamentStartButton
          count={tournamentData.pending?.items.length ?? 0}
          tournamentId={tournamentId}
        />
      </div>
    </div>
  );
}

export default TournamentCreateClient;
