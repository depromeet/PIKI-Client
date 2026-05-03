'use client';

import { useEffect } from 'react';

import RoundBadge from '@/components/tournament/RoundBadge';
import TournamentQuestion from '@/components/tournament/TournamentQuestion';
import VsSection from '@/components/tournament/VsSection';
import { useTournament } from '@/hooks/useTournament';

export default function TournamentPage() {
  const { products, currentMatch, roundLabel, handleSelect } = useTournament();

  useEffect(() => {
    products.forEach(p => {
      const img = new window.Image();
      img.src = p.imagePath;
    });
  }, [products]);

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-[81px]">
      <RoundBadge label={roundLabel} />
      <TournamentQuestion />
      <div className="mt-8 w-full">
        {currentMatch ? (
          <VsSection
            key={roundLabel}
            left={currentMatch[0]}
            right={currentMatch[1]}
            onSelect={handleSelect}
          />
        ) : null}
      </div>
    </div>
  );
}
