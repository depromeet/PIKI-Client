import { useMutation } from '@tanstack/react-query';

import { postJoinGuest } from '../_apis/postJoinGuest';

export const usePostJoinGuest = () => {
  const { mutateAsync: postJoinGuestMutation, isPending: isPostJoinGuestPending } = useMutation({
    mutationFn: postJoinGuest,
  });

  return { postJoinGuestMutation, isPostJoinGuestPending };
};
