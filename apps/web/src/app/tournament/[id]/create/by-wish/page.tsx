import ByWishContent from './_components/ByWishContent';

type ByWishPageProps = {
  params: Promise<{ id: string }>;
};

async function ByWishPage({ params }: ByWishPageProps) {
  const { id } = await params;
  const tournamentId = Number(id);

  return <ByWishContent tournamentId={tournamentId} />;
}

export default ByWishPage;
