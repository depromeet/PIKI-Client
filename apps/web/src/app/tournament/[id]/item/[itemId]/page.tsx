import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound, redirect } from 'next/navigation';

import { getTournamentItem } from '@/app/tournament/[id]/item/[itemId]/_apis/getTournamentItem';
import type { ApiErrorResponseT } from '@/types/api';
import { parseIdParam } from '@/utils/parseIdParam';
import { getQueryClient } from '@/utils/queryClient';

import EditContent from './_components/EditContent';
import type { GetTournamentItemResponseT } from './_types/tournamentItem';

type TournamentItemEditPageProps = {
  params: Promise<{ id: string; itemId: string }>;
};

async function TournamentItemEditPage({ params }: TournamentItemEditPageProps) {
  const { id: _tournamentId, itemId: _tournamentItemId } = await params;
  const tournamentId = parseIdParam(_tournamentId);
  const tournamentItemId = parseIdParam(_tournamentItemId);
  if (!tournamentId || !tournamentItemId) notFound();

  const queryClient = getQueryClient();
  const GET_TOURNAMENT_ITEM_QUERY_KEY = ['tournamentItem', tournamentId, tournamentItemId];
  await queryClient.prefetchQuery({
    queryKey: GET_TOURNAMENT_ITEM_QUERY_KEY,
    queryFn: () => getTournamentItem(tournamentId, tournamentItemId),
  });

  /** 에러 처리 TEMP*/
  const state = queryClient.getQueryState(GET_TOURNAMENT_ITEM_QUERY_KEY);
  if (state && state.status === 'error') {
    if (isAxiosError<ApiErrorResponseT>(state.error) && state.error.response) {
      const { status } = state.error.response;

      /** 토너먼트 권한 없는 경우 */
      if (status === 403) redirect('/home');
      /** 토너먼트 or 토너먼트 아이템이 존재하지 않는 경우 */ else if (status === 404)
        redirect(`/tournament/${tournamentId}/create`);
    }
  }

  /** 아직 PROCESSING 상태인 경우에는 접근 불가 */
  const tournamentItemData = queryClient.getQueryData<GetTournamentItemResponseT>(
    GET_TOURNAMENT_ITEM_QUERY_KEY
  );
  if (tournamentItemData?.status === 'PROCESSING') {
    // TEMP: 아직 PROCESSING 일 때 어떻게 처리해야하는지 정해지지 않았음
    redirect(`/tournament/${tournamentId}/create`);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditContent tournamentId={tournamentId} tournamentItemId={tournamentItemId} />
    </HydrationBoundary>
  );
}

export default TournamentItemEditPage;
