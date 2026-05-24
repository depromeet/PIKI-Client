'use client';

import RoundBadge from './_components/RoundBadge';
import TournamentQuestion from './_components/TournamentQuestion';
import VsSection from './_components/VsSection';
import { FINAL_ROUND_LABEL } from './_consts/rounds';
import useTournament from './_hooks/useTournament';

function TournamentPage() {
  const { currentMatch, roundLabel, handleSelect } = useTournament();
  const isFinal = roundLabel === FINAL_ROUND_LABEL;

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
            isFinal={isFinal}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
}

export default TournamentPage;
