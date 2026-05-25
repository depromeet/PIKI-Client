import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import type { ItemTypeT } from '@/types/item';
import { getQueryClient } from '@/utils/queryClient';

import { getWishlist } from './_apis/getWishlist';
import ItemEditForm from './_components/ItemEditForm';

const parseType = (raw: string | string[] | undefined): ItemTypeT => {
  if (raw === 'tournament') return 'tournament';
  return 'wish';
};

type ItemEditPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string | string[] }>;
};

async function ItemEditPage({ params, searchParams }: ItemEditPageProps) {
  const { id } = await params;
  const { type: typeParam } = await searchParams;
  const type = parseType(typeParam);
  const wishId = Number(id);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemEditForm type={type} wishId={wishId} />
    </HydrationBoundary>
  );
}

export default ItemEditPage;
