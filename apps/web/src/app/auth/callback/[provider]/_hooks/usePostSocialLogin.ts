import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ROUTES } from '@/consts/route';
import type { SocialProviderT } from '@piki/core';

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
    onSuccess: () => {
      router.replace(ROUTES.HOME);
    },
    onError: () => {
      toast.error('로그인에 실패했습니다. 다시 시도해 주세요.');
      router.replace(ROUTES.LOGIN);
    },
  });

  return { postSocialLoginMutation, isPostSocialLoginPending };
};
