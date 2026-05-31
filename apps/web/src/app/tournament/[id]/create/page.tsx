import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from './_apis/getTournament';
import TournamentCreateClient from './TournamentCreateClient';

type TournamentCreatePageProps = {
  params: Promise<{ id: string }>;
};

async function TournamentCreatePage({ params }: TournamentCreatePageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tournament', id],
    queryFn: () => getTournament(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TournamentCreateClient tournamentId={id} />
    </HydrationBoundary>
  );
}

export default TournamentCreatePage;
