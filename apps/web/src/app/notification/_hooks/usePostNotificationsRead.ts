import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postNotificationsRead } from '../_apis/postNotificationsRead';

export const usePostNotificationsRead = () => {
  const queryClient = useQueryClient();

  const { mutate: postNotificationsReadMutation, isPending: isPostNotificationsReadPending } =
    useMutation({
      mutationFn: postNotificationsRead,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      },
    });

  return { postNotificationsReadMutation, isPostNotificationsReadPending };
};
