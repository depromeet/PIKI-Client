import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/consts/route';
import { getQueryClient } from '@/utils/queryClient';

import { getTournament } from '../_common/_apis/getTournament';
import type { GetTournamentInProgressResponseT } from '../_common/_types/tournamentResponse';
import { parseTournamentId } from '../_common/_utils/parseTournamentId';
import { postStartTournament } from './_apis/postStartTournament';
import TournamentClient from './_components/TournamentClient';

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
    redirect(ROUTES.TOURNAMENT_RESULT(tournamentId));
  }

  let hydratedTournament: GetTournamentInProgressResponseT;
  let playTournamentId = tournamentId;

  if (tournamentData.status === 'PENDING') {
    try {
      // 응답 tournamentId 활용:
      // - 주최자(ROOT): 요청 tournamentId 와 동일
      // - 참여자(CLONE): 새로 생성된 CLONE id (이후 본인 인스턴스로 진행)
      const { tournamentId: nextTournamentId, items } = await postStartTournament(tournamentId);

      // CLONE 이 생성됐다면 본인 인스턴스 URL 로 이동 (재진입 시 IN_PROGRESS 분기로 흘러감)
      if (nextTournamentId !== tournamentId) {
        redirect(ROUTES.TOURNAMENT_MATCH(nextTournamentId));
      }

      // start 후 서버는 IN_PROGRESS로 전환됨 — 클라 캐시도 IN_PROGRESS 형태로 시드
      playTournamentId = nextTournamentId;
      hydratedTournament = {
        tournamentId: nextTournamentId,
        name: tournamentData.name,
        isOwner: tournamentData.isOwner,
        status: 'IN_PROGRESS',
        inProgress: {
          currentRound: items.length,
          lastHistory: null,
          remainingItems: items,
        },
      };
    } catch (error) {
      // 409: 다른 탭/요청이 먼저 start 호출한 경우 — 서버 권위 상태로 복구
      if (!isAxiosError(error) || error.response?.status !== 409) throw error;

      const latest = await getTournament(tournamentId);
      if (latest.status === 'COMPLETED') {
        redirect(ROUTES.TOURNAMENT_RESULT(tournamentId));
      }
      if (latest.status === 'PENDING') {
        // 409이면서 여전히 PENDING — 예상 밖, 그대로 던짐
        throw error;
      }
      hydratedTournament = latest;
    }
  } else {
    hydratedTournament = tournamentData;
  }

  const queryClient = getQueryClient();
  queryClient.setQueryData(['tournament', playTournamentId], hydratedTournament);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TournamentClient
        tournamentId={playTournamentId}
        tournamentName={hydratedTournament.name}
        inProgress={hydratedTournament.inProgress}
      />
    </HydrationBoundary>
  );
}

export default TournamentPage;
