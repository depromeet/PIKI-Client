import { useSuspenseQuery } from '@tanstack/react-query';

import { getWishlist } from '../apis/getWishlist';

export const useGetWishlist = () => {
  return useSuspenseQuery({
    queryKey: ['wishlists'],
    queryFn: getWishlist,
  });
};
