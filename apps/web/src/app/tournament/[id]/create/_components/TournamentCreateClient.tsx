'use client';

import { useEffect, useState } from 'react';

import { Dialog } from '@/components/common/dialog';
import GetItemDialogContent from '@/components/common/get-item-dialog';
import { QUERY_ACTION } from '@/consts/queryAction';
import { useQueryAction } from '@/hooks/useQueryAction';
import { MOCK_DEPOSIT_DURATION_MS } from '@/mocks/deposit';
import { MOCK_PARTICIPANTS } from '@/mocks/participants';

import { consumeJoinWelcome, type JoinWelcomePayloadT } from '../../../join/_utils/joinSession';
import { useGetTournament } from '../_hooks/useGetTournament';
import { useScrollToLast } from '../_hooks/useScrollToLast';
import DepositCountdown from './deposit-countdown/DepositCountdown';
import ParticipantPanel from './participant-panel/ParticipantPanel';
import TournamentHeader from './tournament-header/TournamentHeader';
import TournamentItemBasketStatus from './tournament-item-basket-status/TournamentItemBasketStatus';
import TournamentItemBasketCarousel from './tournament-item-basket/TournamentItemBasketCarousel';
import TournamentStartButton from './tournament-start-button/TournamentStartButton';
import WelcomeJoinDialog from './welcome-join-dialog/WelcomeJoinDialog';

type TournamentCreateClientProps = {
  tournamentId: string;
};

function TournamentCreateClient({ tournamentId }: TournamentCreateClientProps) {
  const { scrollToLast, onScrolled } = useScrollToLast();
  const { tournamentData } = useGetTournament(Number(tournamentId));
  const [depositDeadline] = useState(() => Date.now() + MOCK_DEPOSIT_DURATION_MS);
  const [welcomePayload, setWelcomePayload] = useState<JoinWelcomePayloadT | null>(null);

  const { isActive: isGetItemDialogOpen, setIsActive: setIsGetItemDialogOpen } = useQueryAction({
    action: QUERY_ACTION.VALUE.OPEN_GET_ITEM_DIALOG,
  });

  useEffect(() => {
    const payload = consumeJoinWelcome();
    if (payload) setWelcomePayload(payload);
  }, []);

  const handleCloseWelcome = () => setWelcomePayload(null);

  return (
    <div className="flex h-dvh min-h-0 flex-col gap-4 bg-bg-layer-basement pt-20 pb-8">
      <div className="space-y-4 px-5">
        <TournamentHeader name={tournamentData.name} />
        <ParticipantPanel
          participants={MOCK_PARTICIPANTS}
          inviteUrl="https://piki.today/invite/temp"
        />
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

      <div className="flex shrink-0 flex-col gap-3 px-5">
        <DepositCountdown deadline={depositDeadline} />
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

      {welcomePayload && (
        <WelcomeJoinDialog
          open
          onOpenChange={open => {
            if (!open) handleCloseWelcome();
          }}
          nickname={welcomePayload.nickname}
          profileType={welcomePayload.profileType}
          onConfirm={handleCloseWelcome}
        />
      )}
    </div>
  );
}

export default TournamentCreateClient;
