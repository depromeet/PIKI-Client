import { useMutation } from '@tanstack/react-query';

import { postJoin } from '../_apis/postJoin';

export const usePostJoin = () => {
  const { mutate: postJoinMutation, isPending: isPostJoinPending } = useMutation({
    mutationFn: postJoin,
  });

  return { postJoinMutation, isPostJoinPending };
};
