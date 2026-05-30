import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postGuestLogin } from '../_apis/postGuestLogin';

export const usePostGuestLogin = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: postGuestLogin,
    onSuccess: data => {
      router.push('/home');

      if (data.accessToken && data.refreshToken) {
        // TODO: 웹뷰로 로그인 정보 전송
      }
    },
  });

  return { mutate, isPending };
};
