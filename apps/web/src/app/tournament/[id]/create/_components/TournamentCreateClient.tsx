'use client';

import { useState } from 'react';

import { Dialog } from '@/components/dialog';
import GetItemDialogContent from '@/components/get-item-dialog';
import { QUERY_ACTION } from '@/consts/queryAction';
import { useQueryAction } from '@/hooks/useQueryAction';
import { useSSEFallback } from '@/hooks/useSSEFallback';
import { hasParsingItems } from '@/utils/item';

import {
  type JoinConfirmPayloadT,
  type JoinWelcomePayloadT,
  consumeJoinConfirmFor,
  consumeJoinWelcomeFor,
} from '../../../join/_utils/joinSession';
import { useGetTournament } from '../../_common/_hooks/useGetTournament';
import { useCountdown } from '../_hooks/useCountdown';
import { useScrollToLast } from '../_hooks/useScrollToLast';
import DepositCountdown from './deposit-countdown/DepositCountdown';
import MemberJoinConfirmDialog from './member-join-confirm-dialog/MemberJoinConfirmDialog';
import ParticipantPanel from './participant-panel/ParticipantPanel';
import TournamentHeader from './tournament-header/TournamentHeader';
import TournamentItemBasketCarousel from './tournament-item-basket/TournamentItemBasketCarousel';
import TournamentStartButton from './tournament-start-button/TournamentStartButton';
import WelcomeJoinDialog from './welcome-join-dialog/WelcomeJoinDialog';

type TournamentCreateClientProps = {
  tournamentId: number;
};

function TournamentCreateClient({ tournamentId }: TournamentCreateClientProps) {
  const { scrollToLast, onScrolled } = useScrollToLast();
  const { tournamentData } = useGetTournament(tournamentId);

  // 주최자(ROOT)는 시작/완료 시점에 mutation/페이지에서 직접 라우팅한다.
  // 참여자(CLONE 생성 예정)는 ROOT status 변화에 따라 자동 라우팅하지 않고,
  // 본인이 "시작" 버튼을 눌러 CLONE 을 만들고 그 ID 로 매치 화면 진입한다.
  // → status 기반 자동 라우팅이 필요 없다.

  // create 화면은 pending payload 가 있는 상태(PENDING / IN_PROGRESS-MemberWaiting) 만 다룬다.
  // 그 외 상태는 RSC/match·result 페이지에서 라우팅되므로 여기서는 빈 값으로 안전 처리.
  const pending = 'pending' in tournamentData ? tournamentData.pending : null;

  // 아이템 파싱 중이면 SSE 로 실시간 업데이트 (연결 실패 시 polling fallback).
  const hasPendingItem = hasParsingItems(pending?.items ?? []);
  useSSEFallback(['tournament', tournamentId], hasPendingItem);

  // 주최자가 ROOT 를 시작한 후(ownerStarted=true) 에는 초대 기간이 이미 종료된 상태라
  // inviteExpiresAt 이 null 이고 담기 마감 카운트다운도 의미 없다.
  const ownerStarted = pending?.ownerStarted ?? false;
  const depositDeadline = pending?.inviteExpiresAt ?? '';
  const { isExpired } = useCountdown(depositDeadline);
  // 담기 마감 = 초대 코드 만료 시점 (둘은 동일 정책으로 운영).
  // 단, 주최자는 만료 영향 없이 본인 토너먼트에 후보를 담을 수 있다.
  // ownerStarted 면 어차피 시작 흐름으로 넘어가야 하므로 마감 처리하지 않는다.
  const isDepositClosed = !tournamentData.isOwner && !ownerStarted && isExpired;
  // 비회원(GUEST) 은 서버가 dicebear 자동 아바타를 내려주는데,
  // 우리 디자인상 비회원은 기본 SVG 프로필을 노출해야 하므로 무시한다.
  const isGeneratedAvatar = (url: string) => url.includes('api.dicebear.com');
  const participants = (pending?.participants ?? []).map(p => ({
    user: {
      id: p.userId,
      name: p.nickname,
      profileType: 'blue' as const,
      ...(isGeneratedAvatar(p.profileImage) ? {} : { imageUrl: p.profileImage }),
    },
    itemCount: 0,
  }));
  const hasFriends = participants.length > 1;

  const [welcomePayload, setWelcomePayload] = useState<JoinWelcomePayloadT | null>(() =>
    consumeJoinWelcomeFor(tournamentId)
  );
  const [confirmPayload, setConfirmPayload] = useState<JoinConfirmPayloadT | null>(() =>
    consumeJoinConfirmFor(tournamentId)
  );
  const isParticipant = !tournamentData.isOwner;
  // 참여자는 주최자가 ROOT 를 시작한 후(ownerStarted=true) 부터 본인 CLONE 시작 가능.
  const isWaitingForOwnerStart = isParticipant && pending?.ownerStarted === false;

  const { isActive: isGetItemDialogOpen, setIsActive: setIsGetItemDialogOpen } = useQueryAction({
    action: QUERY_ACTION.VALUE.OPEN_GET_ITEM_DIALOG,
  });

  const handleCloseWelcome = () => setWelcomePayload(null);
  const handleCloseConfirm = () => setConfirmPayload(null);

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg-layer-basement pt-padding-top pb-8">
      <div className="px-5">
        <TournamentHeader name={tournamentData.name} hasFriends={hasFriends} />
        <div className="mt-[3.9dvh]">
          <ParticipantPanel
            participants={participants}
            inviteCode={pending?.inviteCode ?? ''}
            inviteExpiresAt={pending?.inviteExpiresAt ?? ''}
          />
        </div>
      </div>

      <div className="mt-[5.9dvh] flex min-h-0 flex-1 flex-col">
        <TournamentItemBasketCarousel
          items={pending?.items}
          scrollToLast={scrollToLast}
          onScrolled={onScrolled}
          isDepositClosed={isDepositClosed}
        />
      </div>

      <div className="flex shrink-0 flex-col gap-3 px-5 pt-[max(6dvh)]">
        {hasFriends && !ownerStarted && !isDepositClosed && (
          <DepositCountdown deadline={depositDeadline} />
        )}
        <TournamentStartButton
          count={pending?.items.length ?? 0}
          tournamentId={tournamentId}
          hasUnreadyItem={
            hasPendingItem || (pending?.items.some(item => item.status === 'FAILED') ?? false)
          }
          hasFriends={hasFriends}
          isWaitingForOwnerStart={isWaitingForOwnerStart}
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
