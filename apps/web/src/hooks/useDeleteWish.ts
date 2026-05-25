import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteWish } from '@/apis/deleteWish';

export const useDeleteWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishId: number) => deleteWish(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
    },
  });
};
