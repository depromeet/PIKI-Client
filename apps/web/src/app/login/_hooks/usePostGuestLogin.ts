import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { setCookie } from '@/utils/cookie';

import { postGuestLogin } from '../_apis/postGuestLogin';

export const usePostGuestLogin = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: postGuestLogin,
    onSuccess: data => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);

      router.push('/home');
      // TODO: 웹뷰로 로그인 정보 전송
    },
  });

  return { mutate, isPending };
};
