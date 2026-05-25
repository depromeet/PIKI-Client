import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { deleteWish } from '../_apis/deleteWish';

export const useDeleteWish = (wishId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteWish(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      router.back();
    },
  });

  return { mutate, isPending };
};
