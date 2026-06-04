import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/consts/route';
import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from '../_common/_apis/getTournament';
import type { GetTournamentResponseT } from '../_common/_types/tournamentResponse';
import { parseTournamentId } from '../_common/_utils/parseTournamentId';
import ResultClient from './_components/ResultClient';

type TournamentResultPageProps = {
  params: Promise<{ id: string }>;
};

async function TournamentResultPage({ params }: TournamentResultPageProps) {
  const { id } = await params;
  const tournamentId = parseTournamentId(id);

  if (tournamentId === null) {
    notFound();
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: () => getTournament(tournamentId),
  });

  const tournamentData = queryClient.getQueryData<GetTournamentResponseT>([
    'tournament',
    tournamentId,
  ]);

  if (tournamentData && tournamentData.status !== 'COMPLETED') {
    redirect(ROUTES.TOURNAMENT_MATCH(tournamentId));
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResultClient tournamentId={tournamentId} />
    </HydrationBoundary>
  );
}

export default TournamentResultPage;
