import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getWishes } from '@/apis/getWishes';
import { postParseUrl } from '@/apis/postParseUrl';
import { postWish } from '@/apis/postWish';

export const wishesQueryKey = ['wishes'] as const;

export const parsedProductQueryKey = (url: string) => ['parsedProduct', url] as const;

export const useWishes = () => {
  return useQuery({
    queryKey: wishesQueryKey,
    queryFn: getWishes,
    staleTime: Infinity,
  });
};

export const useParsedProduct = (url: string) => {
  return useQuery({
    queryKey: parsedProductQueryKey(url),
    queryFn: () => postParseUrl(url),
    enabled: url.length > 0,
    staleTime: Infinity,
    gcTime: 0,
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
