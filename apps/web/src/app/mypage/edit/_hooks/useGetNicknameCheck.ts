import { useMutation } from '@tanstack/react-query';

import { getNicknameCheck } from '../_apis/getNicknameCheck';

export const useGetNicknameCheck = () => {
  const { mutate: getNicknameCheckMutation, isPending: isGetNicknameCheckPending } = useMutation({
    mutationFn: (nickname: string) => getNicknameCheck(nickname),
  });

  return { getNicknameCheckMutation, isGetNicknameCheckPending };
};
