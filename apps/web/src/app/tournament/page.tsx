import { notFound } from 'next/navigation';

import TournamentClient from './_components/TournamentClient';

type TournamentPageProps = {
  searchParams: Promise<{ tournamentId?: string | string[] }>;
};

const parseTournamentId = (raw: string | string[] | undefined): number | null => {
  if (typeof raw !== 'string') return null;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
};

async function TournamentPage({ searchParams }: TournamentPageProps) {
  const { tournamentId: tournamentIdParam } = await searchParams;
  const tournamentId = parseTournamentId(tournamentIdParam);

  if (tournamentId === null) {
    notFound();
  }

  return <TournamentClient tournamentId={tournamentId} />;
}

export default TournamentPage;
