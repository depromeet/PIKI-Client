import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { PatchWishPayloadT } from '../_types/wishTypes';
import { patchWish } from '../_apis/patchWish';

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
