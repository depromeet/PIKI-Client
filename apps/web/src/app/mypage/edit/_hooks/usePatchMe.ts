import { useMutation } from '@tanstack/react-query';

import { patchMe } from '../_apis/patchMe';

export const usePatchMe = () => {
  const { mutate: patchMeMutation, isPending: isPatchMePending } = useMutation({
    mutationFn: ({ image, nickname }: { image?: File; nickname?: string }) => {
      const formData = new FormData();
      if (image) formData.append('image', image);
      if (nickname) formData.append('nickname', nickname);

      return patchMe(formData);
    },
  });

  return { patchMeMutation, isPatchMePending };
};
