import { Suspense } from 'react';

import TournamentCreateClient from './_components/TournamentCreateClient';

type TournamentCreatePageProps = {
  params: Promise<{ id: string }>;
};

async function TournamentCreatePage({ params }: TournamentCreatePageProps) {
  const { id } = await params;
  const tournamentId = Number(id);

  return (
    <Suspense>
      <TournamentCreateClient tournamentId={tournamentId} />
    </Suspense>
  );
}

export default TournamentCreatePage;
