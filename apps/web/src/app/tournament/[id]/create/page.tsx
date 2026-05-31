import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/utils/queryClient';

import TournamentCreateClient from './TournamentCreateClient';
import { getTournament } from './_apis/getTournament';

type TournamentCreatePageProps = {
  params: Promise<{ id: string }>;
};

async function TournamentCreatePage({ params }: TournamentCreatePageProps) {
  const { id: tournamentId } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: () => getTournament(Number(tournamentId)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TournamentCreateClient tournamentId={tournamentId} />
    </HydrationBoundary>
  );
}

export default TournamentCreatePage;
