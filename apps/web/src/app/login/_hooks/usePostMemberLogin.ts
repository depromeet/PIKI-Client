import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { setCookie } from '@/utils/cookie';

import { postGuestLogin } from '../_apis/postGuestLogin';
import { postMemberLogin } from '../_apis/postMemberLogin';

// TEMP
export const usePostMemberLogin = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const data = await postGuestLogin();

      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);

      // TODO: 게스트 로그인 응답에서 가져온 nickname으로 회원 로그인 요청 보내야 함. 현재 409 상태라 임시로 랜덤 닉네임 사용
      // await postDevMember(data.user.nickname, data.accessToken);

      const memberData = await postMemberLogin(
        Math.random().toString(36).slice(2, 12),
        data.accessToken
      );
      setCookie('accessToken', memberData.accessToken);
      setCookie('refreshToken', memberData.refreshToken);
    },
    onSuccess: () => {
      router.push('/home');
      // TODO: 웹뷰로 로그인 정보 전송
    },
  });

  return { mutate, isPending };
};
