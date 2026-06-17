import type { SocialProviderT } from '@piki/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { QUERY_ACTION } from '@/consts/queryAction';
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
      router.replace(getLoginPath(variables.redirect, QUERY_ACTION.VALUE.SOCIAL_LOGIN_ERROR));
    },
  });

  return { postSocialLoginMutation, isPostSocialLoginPending };
};
