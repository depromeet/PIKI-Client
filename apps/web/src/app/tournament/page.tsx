import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from './_apis/getTournament';
import TournamentClient from './_components/TournamentClient';

type TournamentPageProps = {
  searchParams: Promise<{ tournamentId?: string | string[] }>;
};

const parseTournamentId = (raw: string | string[] | undefined): number | null => {
  if (typeof raw !== 'string') return null;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
};

async function TournamentPage({ searchParams }: TournamentPageProps) {
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
      <TournamentClient tournamentId={tournamentId} />
    </HydrationBoundary>
  );
}

export default TournamentPage;
