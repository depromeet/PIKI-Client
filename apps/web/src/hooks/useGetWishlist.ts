import { useSuspenseQuery } from '@tanstack/react-query';

import { getWishlist } from '../apis/getWishlist';

export const useGetWishlist = () => {
  return useSuspenseQuery({
    queryKey: ['wishlists'],
    queryFn: getWishlist,
    /** PROCESSING인 위시가 남아있는 경우 5초마다 갱신 */
    refetchInterval: query => {
      const wishData = query.state.data;
      if (wishData?.some(wish => wish.status === 'PROCESSING')) return 5000;
      return false;
    },
  });
};
