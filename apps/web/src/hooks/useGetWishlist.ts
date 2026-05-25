import { useQuery } from '@tanstack/react-query';

import { getWishlist } from '@/apis/getWishlist';

export const useGetWishlist = () => {
  return useQuery({
    queryKey: ['wishlists'],
    queryFn: getWishlist,
  });
};
