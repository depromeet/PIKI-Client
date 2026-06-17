import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import type { ApiErrorResponseT } from '@/types/api';

import { patchMe } from '../_apis/patchMe';

export const usePatchMe = () => {
  const queryClient = useQueryClient();

  const { mutate: patchMeMutation, isPending: isPatchMePending } = useMutation({
    mutationFn: ({ image, nickname }: { image?: File; nickname?: string }) => {
      const formData = new FormData();
      if (image) formData.append('image', image);
      if (nickname) formData.append('nickname', nickname);

      return patchMe(formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: error => {
      if (!isAxiosError<ApiErrorResponseT>(error) || !error.response) return;

      toast.error(error.response.data.detail);
    },
  });

  return { patchMeMutation, isPatchMePending };
};
