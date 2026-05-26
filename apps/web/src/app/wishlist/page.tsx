import { Suspense } from 'react';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/utils/queryClient';

import { getWishlist } from './_apis/getWishlist';
import WishlistContent from './_components/WishlistContent';

async function WishlistPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['wishlists'],
    queryFn: getWishlist,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <WishlistContent />
      </Suspense>
    </HydrationBoundary>
  );
}

export default WishlistPage;
