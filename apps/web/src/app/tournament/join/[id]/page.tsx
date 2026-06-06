import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { parseIdParam } from '@/utils/parseIdParam';
import { getQueryClient } from '@/utils/queryClient';

import { getInvitePreview } from '../_apis/getInvitePreview';
import JoinPreviewClient from './_components/JoinPreviewClient';

type TournamentJoinPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ code?: string }>;
};

async function TournamentJoinPage({ params, searchParams }: TournamentJoinPageProps) {
  const { id } = await params;
  const { code } = await searchParams;
  const tournamentId = parseIdParam(id);

  if (tournamentId === null) notFound();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['invitePreview', tournamentId],
    queryFn: () => getInvitePreview(tournamentId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JoinPreviewClient tournamentId={tournamentId} inviteCode={code ?? ''} />
    </HydrationBoundary>
  );
}

export default TournamentJoinPage;
