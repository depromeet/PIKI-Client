'use client';

import dynamic from 'next/dynamic';

const TournamentResultPageClient = dynamic(
  () => import('./_components/TournamentResultPageClient'),
  {
    ssr: false,
  }
);

export default function TournamentResultPage() {
  return <TournamentResultPageClient />;
}
