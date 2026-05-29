import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

type PatchWishManualRequestT = {
  name: string;
  currentPrice: number;
};

export const usePatchWish = (wishId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: patchWishMutation, isPending: isPatchWishPending } = useMutation({
    mutationFn: (body: PatchWishManualRequestT) =>
      clientApi.patch<ApiResponseT<unknown>>(ENDPOINTS.WISHLIST(wishId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
      // TODO: 위시템 수정 성공 토스트
      router.replace('/wishlist');
    },
    onError: () => {
      // TODO: 위시템 수정 실패 토스트
      toast.warning('위시 수정에 실패했어요. 잠시 후 다시 시도해주세요.');
    },
  });

  return { patchWishMutation, isPatchWishPending };
};
