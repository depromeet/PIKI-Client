import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from '../_common/_apis/getTournament';
import TournamentCreateClient from './_components/TournamentCreateClient';

type TournamentCreatePageProps = {
  params: Promise<{ id: string }>;
};

async function TournamentCreatePage({ params }: TournamentCreatePageProps) {
  const { id: tournamentId } = await params;
  const numericTournamentId = Number(tournamentId);
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tournament', numericTournamentId],
    queryFn: () => getTournament(numericTournamentId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <TournamentCreateClient tournamentId={tournamentId} />
      </Suspense>
    </HydrationBoundary>
  );
}

export default TournamentCreatePage;
