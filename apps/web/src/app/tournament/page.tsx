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

  const backgroundClassName = isFinalRound
    ? 'bg-gradient-to-b from-[#ECF3FE] via-[#F3F7FE] to-white'
    : 'bg-bg-layer-basement';

  return (
    <main
      className={`hide-scrollbar flex min-h-dvh flex-col items-center overflow-y-auto px-4 pt-[calc(env(safe-area-inset-top)+48px)] pb-[calc(env(safe-area-inset-bottom)+24px)] ${backgroundClassName}`}
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
      <div className={`w-full ${isFinalRound ? 'mt-25' : 'mt-3'}`}>
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

export default TournamentPage;
