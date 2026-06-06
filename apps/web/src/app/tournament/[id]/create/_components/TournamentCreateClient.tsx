'use client';

import { useState } from 'react';

import { Dialog } from '@/components/dialog';
import GetItemDialogContent from '@/components/get-item-dialog';
import { QUERY_ACTION } from '@/consts/queryAction';
import { useQueryAction } from '@/hooks/useQueryAction';

import {
  type JoinConfirmPayloadT,
  type JoinWelcomePayloadT,
  consumeJoinConfirmFor,
  consumeJoinWelcomeFor,
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
  // 담기 마감 = 초대 코드 만료 시점 (둘은 동일 정책으로 운영)
  // 단, 주최자는 만료 영향 없이 본인 토너먼트에 후보를 담을 수 있다.
  const depositDeadline = tournamentData.pending?.inviteExpiresAt ?? '';
  const { isExpired } = useCountdown(depositDeadline);
  const isDepositClosed = !tournamentData.isOwner && isExpired;
  const participants = (tournamentData.pending?.participants ?? []).map(p => ({
    user: {
      id: p.userId,
      name: p.nickname,
      profileType: 'blue' as const,
      imageUrl: p.profileImage,
    },
    itemCount: 0,
  }));
  const hasFriends = participants.length > 1;

  const [welcomePayload, setWelcomePayload] = useState<JoinWelcomePayloadT | null>(() =>
    consumeJoinWelcomeFor(numericTournamentId)
  );
  const [confirmPayload, setConfirmPayload] = useState<JoinConfirmPayloadT | null>(() =>
    consumeJoinConfirmFor(numericTournamentId)
  );
  const isParticipant = !tournamentData.isOwner;

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
          participants={participants}
          inviteCode={tournamentData.pending?.inviteCode}
          inviteExpiresAt={tournamentData.pending?.inviteExpiresAt}
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
        {hasFriends && !isDepositClosed && <DepositCountdown deadline={depositDeadline} />}
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
