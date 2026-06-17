import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getMe } from '@/apis/getMe';
import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from '../_common/_apis/getTournament';
import TournamentCreateClient from './_components/TournamentCreateClient';

type TournamentCreatePageProps = {
  params: Promise<{ id: string }>;
};

async function TournamentCreatePage({ params }: TournamentCreatePageProps) {
  const { id } = await params;
  const tournamentId = Number(id);
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['tournament', tournamentId],
      queryFn: () => getTournament(tournamentId),
    }),
    queryClient.prefetchQuery({
      queryKey: ['me'],
      queryFn: getMe,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TournamentCreateClient tournamentId={tournamentId} />
    </HydrationBoundary>
  );
}

export default TournamentCreatePage;
