import { notFound } from 'next/navigation';

import { parseIdParam } from '@/utils/parseIdParam';

import PlayClient from './_components/PlayClient';

type PlayPageProps = {
  params: Promise<{ id: string }>;
};

async function PlayPage({ params }: PlayPageProps) {
  const { id } = await params;
  const sourceTournamentId = parseIdParam(id);

  if (sourceTournamentId === null) notFound();

  return <PlayClient sourceTournamentId={sourceTournamentId} />;
}

export default PlayPage;
