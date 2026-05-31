'use client';

import type { GetTournamentInProgressResponseT } from '../../_common/_types/tournamentResponse';
import { ROUND_TRANSITION_COPY } from '../_consts/rounds';
import useTournament from '../_hooks/useTournament';
import RoundBadge from './RoundBadge';
import RoundTransition from './RoundTransition';
import TournamentQuestion from './TournamentQuestion';
import VsSection from './VsSection';

type TournamentClientProps = {
  tournamentId: number;
  tournamentName: string;
  inProgress: GetTournamentInProgressResponseT['inProgress'];
};

function TournamentClient({ tournamentId, tournamentName, inProgress }: TournamentClientProps) {
  const {
    currentMatch,
    roundLabel,
    isFinalRound,
    transitionStage,
    handleSelect,
    handleTransitionComplete,
  } = useTournament({ tournamentId, tournamentName, inProgress });

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
      className={`hide-scrollbar flex min-h-dvh flex-col items-center overflow-y-auto px-5 pt-12 pb-6 ${backgroundClassName}`}
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
