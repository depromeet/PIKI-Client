import { useSuspenseQuery } from '@tanstack/react-query';

import { getWish } from '../_apis/getWish';

export const useGetWish = (wishId: number) => {
  const { data: wish } = useSuspenseQuery({
    queryKey: ['wish', wishId],
    queryFn: () => getWish(wishId),
  });

  return { wish };
};
