import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

export const useDeleteFailedWish = (wishId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteWishMutation, isPending: isDeleteWishPending } = useMutation({
    mutationFn: () => clientApi.delete<ApiResponseT<null>>(ENDPOINTS.WISHLIST(wishId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
      router.replace('/wishlist');
    },
    onError: () => {
      toast.warning('위시 삭제에 실패했어요. 잠시 후 다시 시도해주세요.');
    },
  });

  return { deleteWishMutation, isDeleteWishPending };
};
