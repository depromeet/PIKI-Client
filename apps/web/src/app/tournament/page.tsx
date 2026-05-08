'use client';

import { useEffect } from 'react';

import RoundBadge from '@/components/tournament/RoundBadge';
import TournamentQuestion from '@/components/tournament/TournamentQuestion';
import VsSection from '@/components/tournament/VsSection';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTournament } from '@/hooks/useTournament';

const IS_FINAL_LABEL = '🏆 결승전';

export default function TournamentPage() {
  useThemeColor('#FFFFFF');
  const { products, currentMatch, roundLabel, handleSelect } = useTournament();
  const isFinal = roundLabel === IS_FINAL_LABEL;

  useEffect(() => {
    products.forEach(p => {
      const img = new window.Image();
      img.src = p.imagePath;
    });
  }, [products]);

  return (
    <div className="scrollbar-hide flex h-full flex-col items-center overflow-y-auto bg-[#F5F7F8] px-4 pt-[calc(env(safe-area-inset-top)+48px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
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
            onSelect={handleSelect}
            isFinal={isFinal}
          />
        )}
      </div>
    </div>
  );
}
