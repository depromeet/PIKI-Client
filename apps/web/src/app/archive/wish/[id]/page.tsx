import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/consts/route';
import type { ApiErrorResponseT } from '@/types/api';
import { parseIdParam } from '@/utils/parseIdParam';
import { getQueryClient } from '@/utils/queryClient';

import { getWish } from './_apis/getWish';
import EditContent from './_components/EditContent';

type WishEditPageProps = {
  params: Promise<{ id: string }>;
};

async function WishEditPage({ params }: WishEditPageProps) {
  const { id: _wishId } = await params;
  const wishId = parseIdParam(_wishId);
  if (!wishId) notFound();

  const queryClient = getQueryClient();

  try {
    const wishData = await queryClient.fetchQuery({
      queryKey: ['wish', wishId],
      queryFn: () => getWish(wishId),
    });

    /** 아직 PROCESSING 상태인 경우에는 접근 불가 */
    if (wishData.item.status === 'PROCESSING' || wishData.item.status === 'PENDING')
      redirect(ROUTES.ARCHIVE());
  } catch (error) {
    if (!isAxiosError<ApiErrorResponseT>(error)) throw error;

    /** 위시가 존재하지 않는 경우 */
    if (error.response?.status === 404) redirect(ROUTES.ARCHIVE('wish'));

    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditContent wishId={wishId} />
    </HydrationBoundary>
  );
}

export default WishEditPage;
