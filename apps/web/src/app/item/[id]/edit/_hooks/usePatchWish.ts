import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { patchWish } from '../_apis/patchWish';
import type { PatchWishRequestT } from '../_types/wish';

export const usePatchWish = (wishId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (body: PatchWishRequestT) => patchWish(wishId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      router.back();
    },
  });

  return { mutate, isPending };
};
