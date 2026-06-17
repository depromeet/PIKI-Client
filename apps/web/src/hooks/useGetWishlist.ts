import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getWishlist } from '@/apis/getWishlist';

export const useGetWishlist = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['wishlists'],
    queryFn: ({ pageParam }) => getWishlist(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: page => (page.hasNext ? page.nextCursor : undefined),
  });

  const wishlistData = data.pages.flatMap(page => page.items);

  return { wishlistData, fetchNextPage, hasNextPage, isFetchingNextPage };
};
