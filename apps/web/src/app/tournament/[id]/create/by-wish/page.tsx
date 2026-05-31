import ByWishContent from './_components/ByWishContent';

type ByWishPageProps = {
  params: Promise<{ id: string }>;
};

async function ByWishPage({ params }: ByWishPageProps) {
  const { id } = await params;

  return <ByWishContent tournamentId={Number(id)} />;
}

export default ByWishPage;
