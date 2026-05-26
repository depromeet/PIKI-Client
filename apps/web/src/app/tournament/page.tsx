'use client';

import RoundBadge from './_components/RoundBadge';
import RoundTransition from './_components/RoundTransition';
import TournamentQuestion from './_components/TournamentQuestion';
import VsSection from './_components/VsSection';
import { ROUND_TRANSITION_COPY } from './_consts/rounds';
import useTournament from './_hooks/useTournament';

function TournamentPage() {
  const {
    currentMatch,
    roundLabel,
    isFinalRound,
    transitionStage,
    handleSelect,
    handleTransitionComplete,
  } = useTournament();

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

  return (
    <div className="hide-scrollbar flex min-h-dvh flex-col items-center overflow-y-auto bg-bg-layer-basement px-4 pt-[calc(env(safe-area-inset-top)+48px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <div className="mb-6">
        <RoundBadge label={roundLabel} />
      </div>
      <TournamentQuestion />
      <div className="mt-3 w-full">
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
    </div>
  );
}

export default TournamentPage;
