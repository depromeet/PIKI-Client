import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/consts/route';

import { getNicknameCheck } from '../_apis/getNicknameCheck';

export const useGetNicknameCheck = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: getNicknameCheckMutation, isPending: isGetNicknameCheckPending } = useMutation({
    mutationFn: (nickname: string) => getNicknameCheck(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace(ROUTES.MYPAGE);
    },
    onError: () => {
      // TODO: 에러 처리
    },
  });

  return { getNicknameCheckMutation, isGetNicknameCheckPending };
};
