import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import type { ItemTypeT } from '@/types/item';
import { isItemType } from '@/utils/item';
import { parseIdParam } from '@/utils/parseIdParam';
import { getQueryClient } from '@/utils/queryClient';

import { getWish } from './_apis/getWish';
import ItemEditForm from './_components/ItemEditForm';

type ItemEditPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    type: ItemTypeT;
    id?: string; // NOTE: 토너먼트 ID. query params에 짧게 노출하기 위해 tournamentId 대신 id로 설정
  }>;
};

async function ItemEditPage({ params, searchParams }: ItemEditPageProps) {
  const { id } = await params;
  const { type, id: _tournamentId } = await searchParams;

  if (!isItemType(type)) notFound();

  const queryClient = getQueryClient();

  const wishId = parseIdParam(id);
  if (!wishId) notFound();

  await queryClient.prefetchQuery({
    queryKey: ['wish', wishId],
    queryFn: () => getWish(wishId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemEditForm itemType={itemType} wishId={wishId} />
    </HydrationBoundary>
  );
}

export default ItemEditPage;
