import { useMutation } from '@tanstack/react-query';

import { postWishOCR } from '@/apis/postWishOCR';

export const usePostWishOCR = () => {
  const { mutate: postWishOCRMutation } = useMutation({
    mutationFn: (formData: FormData) => postWishOCR(formData),
  });

  return { postWishOCRMutation };
};
