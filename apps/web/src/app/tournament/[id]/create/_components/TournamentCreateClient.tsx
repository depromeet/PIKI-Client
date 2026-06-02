'use client';

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
    <div className="flex h-dvh min-h-0 flex-col bg-bg-layer-basement pt-20 pb-8">
      <div className="space-y-4 px-5">
        <TournamentHeader name={tournamentData.name} />
        <InviteFriends />
        <TournamentItemBasketStatus
          isProcessing={
            tournamentData.pending?.items.some(item => item.status === 'PROCESSING') ?? false
          }
          count={tournamentData.pending?.items.length ?? 0}
        />
      </div>

      <TournamentItemBasketCarousel items={tournamentData.pending?.items} />

      <div className="shrink-0 px-5">
        <TournamentStartButton
          count={tournamentData.pending?.items.length ?? 0}
          tournamentId={tournamentId}
          hasUnreadyItem={
            tournamentData.pending?.items.some(
              item => item.status === 'PROCESSING' || item.status === 'FAILED'
            ) ?? false
          }
        />
      </div>
    </div>
  );
}

export default TournamentCreateClient;
