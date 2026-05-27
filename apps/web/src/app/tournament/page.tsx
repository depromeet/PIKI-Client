import { MOCK_PRODUCTS } from '@/mocks/products';

import TournamentClient from './_components/TournamentClient';

// TODO: Phase 4-1c — searchParams의 tournamentId로 GET/POST start 호출 후 실제 데이터 전달
function TournamentPage() {
  return <TournamentClient tournamentId={1} initialItems={MOCK_PRODUCTS} />;
}

export default TournamentPage;
