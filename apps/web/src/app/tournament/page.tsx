'use client';

import { useState } from 'react';

import { MOCK_MATCHES } from '@/app/mocks/tournament';
import RoundBadge from '@/components/tournament/RoundBadge';
import TournamentQuestion from '@/components/tournament/TournamentQuestion';
import VsSection from '@/components/tournament/VsSection';
import { Product } from '@/types/tournament';

export default function TournamentPage() {
  const [matchIndex, setMatchIndex] = useState(0);

  const match = MOCK_MATCHES[matchIndex] ?? MOCK_MATCHES[0];
  const isLastMatch = matchIndex === MOCK_MATCHES.length - 1;

  const handleSelect = (_winner: Product) => {
    if (!isLastMatch) setMatchIndex(matchIndex + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-[81px]">
      <RoundBadge label={match?.label ?? ''} />
      <TournamentQuestion />
      <div className="mt-8 w-full">
        {match ? (
          <VsSection
            key={matchIndex}
            left={match.left}
            right={match.right}
            onSelect={handleSelect}
          />
        ) : null}
      </div>
    </div>
  );
}
