import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postGuestLogin } from '../_apis/postGuestLogin';
import { postMemberLogin } from '../_apis/postMemberLogin';

// TEMP
export const usePostMemberLogin = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await postGuestLogin();

      // TODO: 게스트 로그인 응답에서 가져온 nickname으로 회원 로그인 요청 보내야 함. 현재 409 상태라 임시로 랜덤 닉네임 사용
      await postMemberLogin(Math.random().toString(36).slice(2, 12));
    },
    onSuccess: () => {
      router.push('/home');
      // TODO: 웹뷰로 로그인 정보 전송
    },
  });

  return { mutate, isPending };
};
