import { parseIdParam } from '@/utils/parseIdParam';

import JoinPreviewClient from './_components/JoinPreviewClient';

type TournamentJoinPageProps = {
  params: Promise<{ id: string }>;
};

async function TournamentJoinPage({ params }: TournamentJoinPageProps) {
  const { id } = await params;
  const tournamentId = parseIdParam(id);

  return <JoinPreviewClient tournamentId={tournamentId} />;
}

export default TournamentJoinPage;
