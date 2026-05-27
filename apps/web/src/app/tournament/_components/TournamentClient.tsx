'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import type { TournamentItemT } from '@/types/tournament';

import { ROUND_TRANSITION_COPY } from '../_consts/rounds';
import { useGetTournament } from '../_hooks/useGetTournament';
import { usePostStartTournament } from '../_hooks/usePostStartTournament';
import useTournament from '../_hooks/useTournament';
import RoundBadge from './RoundBadge';
import RoundTransition from './RoundTransition';
import TournamentQuestion from './TournamentQuestion';
import VsSection from './VsSection';

type TournamentClientProps = {
  tournamentId: number;
};

function TournamentClient({ tournamentId }: TournamentClientProps) {
  const { tournamentData } = useGetTournament(tournamentId);

  if (tournamentData.status === 'COMPLETED') {
    return <RedirectTo url={`/tournament/result?tournamentId=${tournamentId}`} />;
  }

  if (tournamentData.status === 'IN_PROGRESS') {
    return (
      <TournamentRunner
        tournamentId={tournamentId}
        initialItems={tournamentData.inProgress.remainingItems}
      />
    );
  }

  // PENDING — 토너먼트 시작 API 호출 후 진행
  return <TournamentStarter tournamentId={tournamentId} />;
}

/** PENDING 상태에서 진입한 경우 — start API 호출 후 진행 */
function TournamentStarter({ tournamentId }: { tournamentId: number }) {
  const [initialItems, setInitialItems] = useState<TournamentItemT[] | null>(null);
  const hasRequestedStartRef = useRef(false);
  const { startTournament, isPending } = usePostStartTournament(tournamentId);

  useEffect(() => {
    if (hasRequestedStartRef.current) return;
    hasRequestedStartRef.current = true;
    startTournament(undefined, {
      onSuccess: data => setInitialItems(data.items),
    });
  }, [startTournament]);

  if (initialItems === null) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg-layer-basement">
        <p className="body-1-medium text-text-neutral-tertiary">
          {isPending ? '토너먼트 준비 중...' : '잠시만 기다려주세요...'}
        </p>
      </main>
    );
  }

  return <TournamentRunner tournamentId={tournamentId} initialItems={initialItems} />;
}

type TournamentRunnerProps = {
  tournamentId: number;
  initialItems: TournamentItemT[];
};

function TournamentRunner({ tournamentId, initialItems }: TournamentRunnerProps) {
  const {
    currentMatch,
    roundLabel,
    isFinalRound,
    transitionStage,
    handleSelect,
    handleTransitionComplete,
  } = useTournament({ tournamentId, initialItems });

  if (transitionStage) {
    const copy = ROUND_TRANSITION_COPY[transitionStage];
    return (
      <RoundTransition
        stage={transitionStage}
        title={copy.title}
        description={copy.description}
        onComplete={handleTransitionComplete}
      />
    );
  }

  const backgroundClassName = isFinalRound
    ? 'bg-gradient-to-b from-[#ECF3FE] via-[#F3F7FE] to-white'
    : 'bg-bg-layer-basement';

  return (
    <main
      className={`hide-scrollbar flex min-h-dvh flex-col items-center overflow-y-auto px-5 pt-[calc(env(safe-area-inset-top)+48px)] pb-[calc(env(safe-area-inset-bottom)+24px)] ${backgroundClassName}`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <RoundBadge label={roundLabel} isFinal={isFinalRound} />
          <TournamentQuestion isFinal={isFinalRound} />
        </div>
        {isFinalRound && (
          <p className="text-[18px] leading-6.5 font-medium tracking-[-0.6px] text-text-neutral-secondary">
            최종 선택을 해주세요
          </p>
        )}
      </div>
      <div className={`w-full ${isFinalRound ? 'mt-29' : 'mt-8'}`}>
        {currentMatch && (
          <VsSection
            key={roundLabel}
            left={currentMatch[0]}
            right={currentMatch[1]}
            isFinal={isFinalRound}
            onSelect={handleSelect}
          />
        )}
      </div>
    </main>
  );
}

function RedirectTo({ url }: { url: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(url);
  }, [router, url]);

  return null;
}

export default TournamentClient;
