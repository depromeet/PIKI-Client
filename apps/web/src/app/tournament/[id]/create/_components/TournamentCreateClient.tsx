'use client';

import { useState } from 'react';

import { Dialog } from '@/components/common/dialog';
import GetItemDialogContent from '@/components/common/get-item-dialog';
import { QUERY_ACTION } from '@/consts/queryAction';
import { useQueryAction } from '@/hooks/useQueryAction';
import { MOCK_DEPOSIT_DURATION_MS } from '@/mocks/deposit';
import { MOCK_PARTICIPANTS } from '@/mocks/participants';

import {
  type JoinConfirmPayloadT,
  type JoinWelcomePayloadT,
  consumeJoinConfirmFor,
  consumeJoinWelcomeFor,
  isParticipantOf,
} from '../../../join/_utils/joinSession';
import { useCountdown } from '../_hooks/useCountdown';
import { useGetTournament } from '../_hooks/useGetTournament';
import { useScrollToLast } from '../_hooks/useScrollToLast';
import DepositCountdown from './deposit-countdown/DepositCountdown';
import MemberJoinConfirmDialog from './member-join-confirm-dialog/MemberJoinConfirmDialog';
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
  const numericTournamentId = Number(tournamentId);
  const { scrollToLast, onScrolled } = useScrollToLast();
  const { tournamentData } = useGetTournament(numericTournamentId);
  const [depositDeadline] = useState(() => Date.now() + MOCK_DEPOSIT_DURATION_MS);
  const { isExpired: isDepositClosed } = useCountdown(depositDeadline);
  const [welcomePayload, setWelcomePayload] = useState<JoinWelcomePayloadT | null>(() =>
    consumeJoinWelcomeFor(numericTournamentId)
  );
  const [confirmPayload, setConfirmPayload] = useState<JoinConfirmPayloadT | null>(() =>
    consumeJoinConfirmFor(numericTournamentId)
  );
  // TODO: API 연동 후 tournamentData의 boolean 필드 (예: isHost) 로 교체
  const [isParticipant] = useState(() => isParticipantOf(numericTournamentId));

  const { isActive: isGetItemDialogOpen, setIsActive: setIsGetItemDialogOpen } = useQueryAction({
    action: QUERY_ACTION.VALUE.OPEN_GET_ITEM_DIALOG,
  });

  const handleCloseWelcome = () => setWelcomePayload(null);
  const handleCloseConfirm = () => setConfirmPayload(null);

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
          isDepositClosed={isDepositClosed}
        />
      </div>

      <TournamentItemBasketCarousel
        items={tournamentData.pending?.items}
        scrollToLast={scrollToLast}
        onScrolled={onScrolled}
        isDepositClosed={isDepositClosed}
      />

      <div className="flex shrink-0 flex-col gap-3 px-5">
        {!isDepositClosed && <DepositCountdown deadline={depositDeadline} />}
        <TournamentStartButton
          count={tournamentData.pending?.items.length ?? 0}
          tournamentId={tournamentId}
          hasUnreadyItem={
            tournamentData.pending?.items.some(
              item => item.status === 'PROCESSING' || item.status === 'FAILED'
            ) ?? false
          }
          isDepositClosed={isDepositClosed}
          isParticipant={isParticipant}
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

      {confirmPayload && (
        <MemberJoinConfirmDialog
          open
          onOpenChange={open => {
            if (!open) handleCloseConfirm();
          }}
          nickname={confirmPayload.nickname}
          profileType={confirmPayload.profileType}
          tournamentName={confirmPayload.tournamentName}
          itemCount={confirmPayload.itemCount}
          participantCount={confirmPayload.participantCount}
          onConfirm={handleCloseConfirm}
        />
      )}
    </div>
  );
}

export default TournamentCreateClient;
