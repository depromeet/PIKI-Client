import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { PatchWishRequestT } from '../_types/wishTypes';
import { patchWish } from '../_apis/patchWish';

export const usePatchWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wishId, payload }: { wishId: number; payload: PatchWishRequestT }) =>
      patchWish(wishId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
    },
  });
};
