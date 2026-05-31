import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getTournamentItem } from '@/apis/getTournamentItem';
import type { ItemTypeT } from '@/types/item';
import { isItemType } from '@/utils/item';
import { parseIdParam } from '@/utils/parseIdParam';
import { getQueryClient } from '@/utils/queryClient';

import { getWish } from '../edit/_apis/getWish';
import ItemCreateForm from './_components/ItemCreateForm';

type ItemCreatePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    type: ItemTypeT;
    id?: string; // NOTE: 토너먼트 ID. query params에 짧게 노출하기 위해 tournamentId 대신 id로 설정
  }>;
};

async function ItemCreatePage({ params, searchParams }: ItemCreatePageProps) {
  const { id } = await params;
  const { type, id: _tournamentId } = await searchParams;

  if (!isItemType(type)) notFound();

  const queryClient = getQueryClient();

  let itemType: ItemTypeT | null = null;
  if (type === 'wish') {
    const wishId = parseIdParam(id);
    if (!wishId) notFound();

    itemType = 'wish';
    await queryClient.prefetchQuery({
      queryKey: ['wish', wishId],
      queryFn: () => getWish(wishId),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ItemCreateForm itemType={itemType} wishId={wishId} />
      </HydrationBoundary>
    );
  } else if (type === 'tournament' && _tournamentId) {
    const tournamentId = parseIdParam(_tournamentId);
    const tournamentItemId = parseIdParam(id);
    if (!tournamentId || !tournamentItemId) notFound();

    itemType = 'tournament';
    await queryClient.prefetchQuery({
      queryKey: ['tournament', tournamentItemId],
      queryFn: () => getTournamentItem(tournamentId, tournamentItemId),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ItemCreateForm
          itemType={itemType}
          tournamentId={tournamentId}
          tournamentItemId={tournamentItemId}
        />
      </HydrationBoundary>
    );
  }

  notFound();
}

export default ItemCreatePage;
