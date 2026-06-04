import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/consts/route';
import { parseIdParam } from '@/utils/parseIdParam';
import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from './_common/_apis/getTournament';

type TournamentLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

async function TournamentLayout({ children, params }: TournamentLayoutProps) {
  const { id } = await params;
  const tournamentId = parseIdParam(id);
  const queryClient = getQueryClient();

  if (tournamentId === null) notFound();

  /** 토너먼트 접근 권한 조회 */
  try {
    const tournamentData = await getTournament(tournamentId);
    queryClient.setQueryData(['tournament', tournamentId], tournamentData);
  } catch (error) {
    if (!isAxiosError(error)) throw error;

    if (error.response?.status === 403) redirect(ROUTES.HOME);
    else if (error.response?.status === 404) notFound(); // TODO: 아직 미정
  }

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

export default TournamentLayout;
