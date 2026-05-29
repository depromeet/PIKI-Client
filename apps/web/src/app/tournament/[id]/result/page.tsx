import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from '../../_apis/getTournament';
import ResultClient from './_components/ResultClient';

type TournamentResultPageProps = {
  params: Promise<{ id: string }>;
};

const parseTournamentId = (raw: string): number | null => {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResultClient tournamentId={tournamentId} />
    </HydrationBoundary>
  );
}

export default TournamentResultPage;
