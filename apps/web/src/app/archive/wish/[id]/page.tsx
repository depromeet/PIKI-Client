import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/consts/route';
import type { ApiErrorResponseT } from '@/types/api';
import { parseIdParam } from '@/utils/parseIdParam';
import { getQueryClient } from '@/utils/queryClient';

import { getWish } from './_apis/getWish';
import EditContent from './_components/EditContent';
import type { GetWishResponseT } from './_types/wish';

type WishEditPageProps = {
  params: Promise<{ id: string }>;
};

async function WishEditPage({ params }: WishEditPageProps) {
  const { id: _wishId } = await params;
  const wishId = parseIdParam(_wishId);
  if (!wishId) notFound();

  const queryClient = getQueryClient();
  const GET_WISH_QUERY_KEY = ['wish', wishId];
  await queryClient.prefetchQuery({
    queryKey: GET_WISH_QUERY_KEY,
    queryFn: () => getWish(wishId),
  });

  /** 에러 처리 TEMP*/
  const state = queryClient.getQueryState(GET_WISH_QUERY_KEY);
  if (state && state.status === 'error') {
    if (isAxiosError<ApiErrorResponseT>(state.error) && state.error.response) {
      const { status } = state.error.response;

      /** 게스트인 경우 */
      if (status === 403) redirect(ROUTES.HOME);
      /** 위시가 존재하지 않는 경우 */ else if (status === 404) redirect(ROUTES.ARCHIVE('wish'));
    }
  }

  /** 아직 PROCESSING 상태인 경우에는 접근 불가 */
  const wishData = queryClient.getQueryData<GetWishResponseT>(GET_WISH_QUERY_KEY);
  if (wishData?.item.status === 'PROCESSING' || wishData?.item.status === 'PENDING')
    redirect(ROUTES.ARCHIVE());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditContent wishId={wishId} />
    </HydrationBoundary>
  );
}

export default WishEditPage;
