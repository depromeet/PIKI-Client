import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from './_common/_apis/getTournament';
import TournamentClient from './_common/_components/TournamentClient';

type TournamentPageProps = {
  params: Promise<{ id: string }>;
};

const parseTournamentId = (raw: string): number | null => {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TournamentClient tournamentId={tournamentId} />
    </HydrationBoundary>
  );
}

export default TournamentPage;
