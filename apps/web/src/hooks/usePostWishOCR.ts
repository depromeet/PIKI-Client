import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postWishOCR } from '@/apis/postWishOCR';

export const usePostWishOCR = () => {
  const queryClient = useQueryClient();

  const { mutate: postWishOCRMutation, isPending: isPostWishOCRPending } = useMutation({
    mutationFn: (formData: FormData) => postWishOCR(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
    },
  });

  return { postWishOCRMutation, isPostWishOCRPending };
};
