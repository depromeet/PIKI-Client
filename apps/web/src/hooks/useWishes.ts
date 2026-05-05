import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getWishes } from '@/apis/getWishes';
import { postWish } from '@/apis/postWish';

export const wishesQueryKey = ['wishes'] as const;

export const useWishes = () => {
  return useQuery({
    queryKey: wishesQueryKey,
    queryFn: getWishes,
    staleTime: Infinity,
  });
};

export const useAddWish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishesQueryKey });
    },
  });
};
