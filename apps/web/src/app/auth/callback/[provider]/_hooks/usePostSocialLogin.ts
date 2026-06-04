import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ROUTES } from '@/consts/route';
import type { SocialProviderT } from '@/types/auth';
import { setCookie } from '@/utils/cookie';
import { isWebview } from '@/utils/webBridge';

import { postSocialLogin } from '../_apis/postSocialLogin';

export const usePostSocialLogin = (provider: SocialProviderT) => {
  const router = useRouter();

  const { mutate: postSocialLoginMutation, isPending: isPostSocialLoginPending } = useMutation({
    mutationFn: ({
      code,
      redirectUri,
      state,
    }: {
      code: string;
      redirectUri: string;
      state: string;
    }) => postSocialLogin(provider, { code, redirectUri, state }),
    onSuccess: data => {
      setCookie('user_role', data.user.identityType, { days: 14 });

      if (isWebview() && data.accessToken && data.refreshToken) {
        setCookie('access_token', data.accessToken, { hours: 1 });
        setCookie('refresh_token', data.refreshToken, { days: 14 });
      }
      router.replace(ROUTES.HOME);
    },
    onError: () => {
      toast.error('로그인에 실패했습니다. 다시 시도해 주세요.');
      router.replace(ROUTES.LOGIN);
    },
  });

  return { postSocialLoginMutation, isPostSocialLoginPending };
};
