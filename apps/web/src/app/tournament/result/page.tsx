import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from '../_apis/getTournament';
import ResultClient from './_components/ResultClient';

type TournamentResultPageProps = {
  searchParams: Promise<{ tournamentId?: string | string[] }>;
};

const parseTournamentId = (raw: string | string[] | undefined): number | null => {
  if (typeof raw !== 'string') return null;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
};

async function TournamentResultPage({ searchParams }: TournamentResultPageProps) {
  const { tournamentId: tournamentIdParam } = await searchParams;
  const tournamentId = parseTournamentId(tournamentIdParam);

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
