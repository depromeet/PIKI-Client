import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchWish } from '@/apis/patchWish';
import type { PatchWishPayloadT } from '@/types/wishlist';

export const usePatchWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wishId, payload }: { wishId: number; payload: PatchWishPayloadT }) =>
      patchWish(wishId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
    },
  });
};
