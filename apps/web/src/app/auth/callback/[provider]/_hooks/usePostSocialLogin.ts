import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ROUTES } from '@/consts/route';
import type { SocialProviderT } from '@/types/auth';
import { getLoginRedirectPath } from '@/utils/loginRedirect';

import { postSocialLogin } from '../_apis/postSocialLogin';

export const usePostSocialLogin = (provider: SocialProviderT) => {
  const router = useRouter();

  const { mutate: postSocialLoginMutation, isPending: isPostSocialLoginPending } = useMutation({
    mutationFn: ({
      code,
      redirect: _redirect,
      redirectUri,
      state,
    }: {
      code: string;
      redirect: string | null;
      redirectUri: string;
      state: string;
    }) => postSocialLogin(provider, { code, redirectUri, state }),
    onSuccess: (_, variables) => {
      router.replace(getLoginRedirectPath(variables.redirect));
    },
    onError: () => {
      toast.error('로그인에 실패했습니다. 다시 시도해 주세요.');
      router.replace(ROUTES.LOGIN);
    },
  });

  return { postSocialLoginMutation, isPostSocialLoginPending };
};
