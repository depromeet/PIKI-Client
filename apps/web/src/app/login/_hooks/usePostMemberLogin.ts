import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { setCookie } from '@/utils/cookie';
import { isWebview } from '@/utils/webBridge';

import { postGuestLogin } from '../_apis/postGuestLogin';
import { postMemberLogin } from '../_apis/postMemberLogin';

/** TEMP — 게스트 로그인 후 회원(개발용) 로그인을 순서대로 실행 */
export const usePostMemberLogin = () => {
  const router = useRouter();

  const { mutate: postMemberLoginMutation, isPending: isPostMemberLoginPending } = useMutation({
    mutationFn: async () => {
      const guestData = await postGuestLogin();

      if (isWebview() && guestData.accessToken && guestData.refreshToken) {
        setCookie('access_token', guestData.accessToken);
        setCookie('refresh_token', guestData.refreshToken);
      }

      return postMemberLogin(Math.random().toString(36).slice(2, 12));
    },
    onSuccess: data => {
      router.push('/home');

      console.log(data);

      if (isWebview() && data.accessToken && data.refreshToken) {
        setCookie('access_token', data.accessToken);
        setCookie('refresh_token', data.refreshToken);
      }
      // TODO: 웹뷰로 로그인 정보 전송
    },
  });

  return { postMemberLoginMutation, isPostMemberLoginPending };
};
