import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound, redirect } from 'next/navigation';

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

      /** 토너먼트 권한 없는 경우 */
      if (status === 403) redirect('/home');
      /** 토너먼트 or 토너먼트 아이템이 존재하지 않는 경우 */ else if (status === 404)
        redirect(`/wishlist`);
    }
  }

  /** 아직 PROCESSING 상태인 경우에는 접근 불가 */
  const wishData = queryClient.getQueryData<GetWishResponseT>(GET_WISH_QUERY_KEY);
  if (wishData?.item.status === 'PROCESSING') {
    // TEMP: 아직 PROCESSING 일 때 어떻게 처리해야하는지 정해지지 않았음
    redirect(`/wishlist`);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditContent wishId={wishId} />
    </HydrationBoundary>
  );
}

export default WishEditPage;
