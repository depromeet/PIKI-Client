'use client';

import { Dialog } from '@/components/common/dialog';
import GetItemDialogContent from '@/components/common/get-item-dialog';
import { QUERY_ACTION } from '@/consts/queryAction';
import { useQueryAction } from '@/hooks/useQueryAction';

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

  const { isActive: isGetItemDialogOpen, setIsActive: setIsGetItemDialogOpen } = useQueryAction({
    action: QUERY_ACTION.VALUE.OPEN_GET_ITEM_DIALOG,
  });

  return (
    <div className="flex h-dvh min-h-0 flex-col gap-4 bg-bg-layer-basement pt-20 pb-8">
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

      <Dialog open={isGetItemDialogOpen} onOpenChange={setIsGetItemDialogOpen}>
        <GetItemDialogContent type="tournament" />
      </Dialog>
    </div>
  );
}

export default TournamentCreateClient;
