import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postWishRefresh } from '../_apis/postWishRefresh';

export const usePostWishRefresh = (wishId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: postWishRefreshMutation, isPending: isPostWishRefreshPending } = useMutation({
    mutationFn: () => postWishRefresh(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wish', wishId] });
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
      router.back();
    },
  });

  return { postWishRefreshMutation, isPostWishRefreshPending };
};
