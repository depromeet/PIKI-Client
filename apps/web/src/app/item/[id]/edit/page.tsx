import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getQueryClient } from '@/utils/queryClient';

import { getWish } from './_apis/getWish';
import WishEditForm from './_components/WishEditForm';

type ItemEditPageProps = {
  params: Promise<{ id: string }>;
};

async function ItemEditPage({ params }: ItemEditPageProps) {
  const { id } = await params;
  const wishId = Number(id);

  if (!Number.isInteger(wishId) || wishId <= 0) {
    notFound();
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['wish', wishId],
    queryFn: () => getWish(wishId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WishEditForm wishId={wishId} />
    </HydrationBoundary>
  );
}

export default ItemEditPage;
