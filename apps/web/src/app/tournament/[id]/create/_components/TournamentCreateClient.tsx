'use client';

import Spacing from '@/components/common/spacing';

import { useGetTournament } from '../_hooks/useGetTournament';
import { useScrollToLast } from '../_hooks/useScrollToLast';
import InviteFriends from './invite-friends/InviteFriends';
import TournamentHeader from './tournament-header/TournamentHeader';
import TournamentItemBasketStatus from './tournament-item-basket-status/TournamentItemBasketStatus';
import TournamentItemBasketCarousel from './tournament-item-basket/TournamentItemBasketCarousel';
import TournamentStartButton from './tournament-start-button/TournamentStartButton';

type TournamentCreateClientProps = {
  tournamentId: string;
};

function TournamentCreateClient({ tournamentId }: TournamentCreateClientProps) {
  const { scrollToLast, onScrolled } = useScrollToLast();
  const { tournamentData } = useGetTournament(Number(tournamentId));

  return (
    <div className="bg-layer-basement flex h-dvh min-h-0 flex-col pt-20 pb-8">
      <TournamentHeader name={tournamentData.name} />
      <Spacing size={16} />
      <InviteFriends />
      <Spacing size={16} />
      <TournamentItemBasketStatus
        isProcessing={
          tournamentData.pending?.items.some(item => item.status === 'PROCESSING') ?? false
        }
        count={tournamentData.pending?.items.length ?? 0}
      />

      <TournamentItemBasketCarousel
        items={tournamentData.pending?.items}
        scrollToLast={scrollToLast}
        onScrolled={onScrolled}
      />

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
