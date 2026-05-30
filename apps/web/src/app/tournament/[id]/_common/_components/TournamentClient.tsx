'use client';

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
    // RSC에서 redirect 처리되므로 도달하지 않지만, status union의 안전한 분기를 위해 유지
    return null;
  }

  if (tournamentData.status === 'IN_PROGRESS') {
    return (
      <TournamentRunner
        tournamentId={tournamentId}
        tournamentName={tournamentData.name}
        initialItems={tournamentData.inProgress.remainingItems}
      />
    );
  }

  // PENDING — 토너먼트 시작 API 호출 후 진행
  return <TournamentStarter tournamentId={tournamentId} tournamentName={tournamentData.name} />;
}

/** PENDING 상태에서 진입한 경우 — start API 호출 후 진행 */
function TournamentStarter({
  tournamentId,
  tournamentName,
}: {
  tournamentId: number;
  tournamentName: string;
}) {
  const [initialItems, setInitialItems] = useState<TournamentItemT[] | null>(null);
  const hasRequestedStartRef = useRef(false);
  const { postStartTournamentMutation, isPostStartTournamentPending } = usePostStartTournament({
    tournamentId,
    onSuccess: data => setInitialItems(data.items),
  });

  useEffect(() => {
    if (hasRequestedStartRef.current) return;
    hasRequestedStartRef.current = true;
    postStartTournamentMutation();
  }, [postStartTournamentMutation]);

  if (initialItems === null) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg-layer-basement">
        <p className="body-1-medium text-text-neutral-tertiary">
          {isPostStartTournamentPending ? '토너먼트 준비 중...' : '잠시만 기다려주세요...'}
        </p>
      </main>
    );
  }

  return (
    <TournamentRunner
      tournamentId={tournamentId}
      tournamentName={tournamentName}
      initialItems={initialItems}
    />
  );
}

type TournamentRunnerProps = {
  tournamentId: number;
  tournamentName: string;
  initialItems: TournamentItemT[];
};

function TournamentRunner({ tournamentId, tournamentName, initialItems }: TournamentRunnerProps) {
  const {
    currentMatch,
    roundLabel,
    isFinalRound,
    transitionStage,
    handleSelect,
    handleTransitionComplete,
  } = useTournament({ tournamentId, tournamentName, initialItems });

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
          <p className="heading-2-medium text-text-neutral-secondary">최종 선택을 해주세요</p>
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

export default TournamentClient;
