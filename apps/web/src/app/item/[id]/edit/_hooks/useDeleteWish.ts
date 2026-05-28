import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteWish } from '../_apis/deleteWish';

export const useDeleteWish = (wishId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteWishMutation, isPending: isDeleteWishPending } = useMutation({
    mutationFn: () => deleteWish(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wish', wishId] });
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      router.back();
    },
    onError: () => {
      toast.warning('위시 삭제에 실패했어요. 잠시 후 다시 시도해주세요.');
    },
  });

  return { deleteWishMutation, isDeleteWishPending };
};
