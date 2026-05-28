import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { patchWish } from '../_apis/patchWish';
import type { PatchWishRequestT } from '../_types/wish';

export const usePatchWish = (wishId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (body: PatchWishRequestT) => patchWish(wishId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wish', wishId] });
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      router.back();
    },
    onError: () => {
      toast.warning('위시 수정에 실패했어요. 잠시 후 다시 시도해주세요.');
    },
  });

  return { mutate, isPending };
};
