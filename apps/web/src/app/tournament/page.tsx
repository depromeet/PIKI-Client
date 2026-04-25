'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import RoundBadge from '@/components/tournament/RoundBadge';
import TournamentQuestion from '@/components/tournament/TournamentQuestion';
import VsSection from '@/components/tournament/VsSection';
import { MOCK_MATCHES } from '@/mocks/tournament';
import type { Product } from '@/types/tournament';

export default function TournamentPage() {
  const router = useRouter();
  const [matchIndex, setMatchIndex] = useState(0);

  const match = MOCK_MATCHES[matchIndex] ?? MOCK_MATCHES[0];
  const isLastMatch = matchIndex === MOCK_MATCHES.length - 1;

  useEffect(() => {
    const uniqueImages = Array.from(
      new Set(MOCK_MATCHES.flatMap(m => [m.left.image, m.right.image]))
    );
    uniqueImages.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const handleSelect = (_winner: Product) => {
    if (isLastMatch) router.push(`/tournament/result`);
    else setMatchIndex(matchIndex + 1);
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
