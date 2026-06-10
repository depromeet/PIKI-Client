'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Dialog } from '@/components/dialog';
import GetItemDialogContent from '@/components/get-item-dialog';
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

const SSE_FALLBACK_TIMEOUT_MS = 60_000;

function TournamentCreateClient({ tournamentId }: TournamentCreateClientProps) {
  const numericTournamentId = Number(tournamentId);
  const { scrollToLast, onScrolled } = useScrollToLast();
  const { tournamentData } = useGetTournament(numericTournamentId);
  const queryClient = useQueryClient();

  const hasPendingItem =
    tournamentData.pending?.items.some(
      item => item.status === 'PENDING' || item.status === 'PROCESSING'
    ) ?? false;

  // SSE 이벤트가 오지 않는 경우를 대비한 fallback: PENDING/PROCESSING 아이템이 있으면
  // 60초 후 tournament 쿼리를 강제로 한 번 refetch한다.
  useEffect(() => {
    if (!hasPendingItem) return;
    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['tournament', numericTournamentId] });
    }, SSE_FALLBACK_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [hasPendingItem, numericTournamentId, queryClient]);

  const { isActive: isGetItemDialogOpen, setIsActive: setIsGetItemDialogOpen } = useQueryAction({
    action: QUERY_ACTION.VALUE.OPEN_GET_ITEM_DIALOG,
  });

  return (
    <div className="flex h-dvh min-h-0 flex-col gap-4 bg-bg-layer-basement pt-20 pb-8">
      <div className="space-y-4 px-5">
        <TournamentHeader name={tournamentData.name} />
        <InviteFriends />
        <TournamentItemBasketStatus
          isProcessing={hasPendingItem}
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
            hasPendingItem ||
            (tournamentData.pending?.items.some(item => item.status === 'FAILED') ?? false)
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
