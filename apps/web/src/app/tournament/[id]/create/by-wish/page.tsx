import { notFound } from 'next/navigation';

import { parseIdParam } from '@/utils/parseIdParam';

import ByWishContent from './_components/ByWishContent';

type ByWishPageProps = {
  params: Promise<{ id: string }>;
};

async function ByWishPage({ params }: ByWishPageProps) {
  const { id: _tournamentId } = await params;
  const tournamentId = parseIdParam(_tournamentId);

  if (!tournamentId) notFound();

  return <ByWishContent tournamentId={tournamentId} />;
}

export default ByWishPage;
