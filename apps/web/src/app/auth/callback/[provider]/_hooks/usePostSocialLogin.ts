import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type { SocialProviderT } from '@/types/auth';

import { postSocialLogin } from '../_apis/postSocialLogin';

export const usePostSocialLogin = (provider: SocialProviderT) => {
  const router = useRouter();

  const {
    mutate: postSocialLoginMutation,
    isPending: isPostSocialLoginPending,
    isError,
  } = useMutation({
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
      router.replace('/home');
    },
  });

  return { postSocialLoginMutation, isPostSocialLoginPending, isError };
};
