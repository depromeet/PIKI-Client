import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound, redirect } from 'next/navigation';

import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from './_common/_apis/getTournament';
import TournamentClient from './_common/_components/TournamentClient';
import type { GetTournamentResponseT } from './_common/_types/tournamentResponse';
import { parseTournamentId } from './_common/_utils/parseTournamentId';

type TournamentPageProps = {
  params: Promise<{ id: string }>;
};

async function TournamentPage({ params }: TournamentPageProps) {
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

  if (tournamentData?.status === 'COMPLETED') {
    redirect(`/tournament/${tournamentId}/result`);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TournamentClient tournamentId={tournamentId} />
    </HydrationBoundary>
  );
}

export default TournamentPage;
