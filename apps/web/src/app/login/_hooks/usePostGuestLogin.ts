import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/consts/route';
import { setCookie } from '@/utils/cookie';
import { isWebview } from '@/utils/webBridge';

import { postGuestLogin } from '../_apis/postGuestLogin';

export const usePostGuestLogin = () => {
  const router = useRouter();

  const { mutate: postGuestLoginMutation, isPending: isPostGuestLoginPending } = useMutation({
    mutationFn: postGuestLogin,
    onSuccess: data => {
      router.push(ROUTES.HOME);

      if (isWebview() && data.accessToken && data.refreshToken) {
        setCookie('access_token', data.accessToken, { hours: 1 });
        setCookie('refresh_token', data.refreshToken, { days: 14 });
        // TODO: 웹뷰로 로그인 정보 전송
      }
    },
  });

  return { postGuestLoginMutation, isPostGuestLoginPending };
};
