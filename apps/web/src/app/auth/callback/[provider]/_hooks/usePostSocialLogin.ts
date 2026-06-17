import type { SocialProviderT } from '@piki/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getLoginPath, getLoginRedirectPath } from '@/utils/loginRedirect';

import { postSocialLogin } from '../_apis/postSocialLogin';

export const usePostSocialLogin = (provider: SocialProviderT) => {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ['me'] });
      window.location.replace(getLoginRedirectPath(variables.redirect));
    },
    onError: (_, variables) => {
      sessionStorage.setItem('piki_social_login_error', '1');
      router.replace(getLoginPath(variables.redirect));
    },
  });

  return { postSocialLoginMutation, isPostSocialLoginPending };
};
