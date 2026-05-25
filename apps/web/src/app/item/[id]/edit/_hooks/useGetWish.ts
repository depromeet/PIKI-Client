import { useSuspenseQuery } from '@tanstack/react-query';

import { getWishlist } from '../_apis/getWishlist';

export const useGetWish = (wishId: number) => {
  const { data: list } = useSuspenseQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

  const wish = list.find(entry => entry.wish.id === wishId) ?? null;

  return { wish };
};
