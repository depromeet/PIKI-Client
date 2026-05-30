import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound, redirect } from 'next/navigation';

import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from './_common/_apis/getTournament';
import { postStartTournament } from './_common/_apis/postStartTournament';
import TournamentClient from './_common/_components/TournamentClient';
import type { GetTournamentInProgressResponseT } from './_common/_types/tournamentResponse';
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

  const tournamentData = await getTournament(tournamentId);

  if (tournamentData.status === 'COMPLETED') {
    redirect(`/tournament/${tournamentId}/result`);
  }

  let hydratedTournament: GetTournamentInProgressResponseT;

  if (tournamentData.status === 'PENDING') {
    const { items } = await postStartTournament(tournamentId);
    // start 후 서버는 IN_PROGRESS로 전환됨 — 클라 캐시도 IN_PROGRESS 형태로 시드
    hydratedTournament = {
      tournamentId,
      name: tournamentData.name,
      status: 'IN_PROGRESS',
      inProgress: {
        currentRound: items.length,
        lastHistory: null,
        remainingItems: items,
      },
    };
  } else {
    hydratedTournament = tournamentData;
  }

  const queryClient = getQueryClient();
  queryClient.setQueryData(['tournament', tournamentId], hydratedTournament);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TournamentClient
        tournamentId={tournamentId}
        tournamentName={hydratedTournament.name}
        inProgress={hydratedTournament.inProgress}
      />
    </HydrationBoundary>
  );
}

export default TournamentPage;
