import EditContent from './_components/EditContent';

type TournamentItemEditPageProps = {
  params: Promise<{ id: string; itemId: string }>;
};

async function TournamentItemEditPage({ params }: TournamentItemEditPageProps) {
  const { id, itemId } = await params;
  const tournamentId = Number(id);
  const tournamentItemId = Number(itemId);

  return <EditContent tournamentId={tournamentId} tournamentItemId={tournamentItemId} />;
}

export default TournamentItemEditPage;
