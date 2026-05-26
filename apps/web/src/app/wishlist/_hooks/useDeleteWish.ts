import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteWish } from '../_apis/deleteWish';

export const useDeleteWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishId: number) => deleteWish(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
    },
    onError: () => {
      toast.error('위시 삭제에 실패했어요');
    },
  });
};
