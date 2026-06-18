import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/consts/route';
import type { ApiErrorResponseT } from '@/types/api';
import { parseIdParam } from '@/utils/parseIdParam';
import { getQueryClient } from '@/utils/queryClient';

import { getTournamentItem } from './_apis/getTournamentItem';

type TournamentItemLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string; itemId: string }>;
};

async function TournamentItemLayout({ children, params }: TournamentItemLayoutProps) {
  const { id, itemId } = await params;

  const tournamentId = parseIdParam(id);
  const tournamentItemId = parseIdParam(itemId);

  if (!tournamentId || !tournamentItemId) notFound();

  const queryClient = getQueryClient();

  /** 토너먼트 아이템 접근 권한 조회 */
  try {
    const tournamentItemData = await getTournamentItem(tournamentId, tournamentItemId);
    queryClient.setQueryData(
      ['tournamentItem', tournamentId, tournamentItemId],
      tournamentItemData
    );

    /** 아직 PROCESSING 상태인 경우에는 접근 불가 */
    if (tournamentItemData.status === 'PROCESSING' || tournamentItemData.status === 'PENDING')
      redirect(ROUTES.TOURNAMENT_CREATE(tournamentId));
  } catch (error) {
    if (!isAxiosError<ApiErrorResponseT>(error)) throw error;

    /** 토너먼트 아이템 접근 권한 없는 경우 */
    if (error.response?.status === 403) redirect(ROUTES.HOME);
    /** 토너먼트 아이템이 존재하지 않는 경우 */ else if (error.response?.status === 404)
      redirect(ROUTES.TOURNAMENT_CREATE(tournamentId));

    throw error;
  }

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

export default TournamentItemLayout;
