import type { SocialProviderT } from '@piki/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getLoginPath, getLoginRedirectPath } from '@/utils/loginRedirect';

import { postSocialLogin } from '../_apis/postSocialLogin';

export const usePostSocialLogin = (provider: SocialProviderT) => {
  const queryClient = useQueryClient();

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
      toast.error('로그인에 실패했습니다. 다시 시도해 주세요.');
      window.location.replace(getLoginPath(variables.redirect));
    },
  });

  return { postSocialLoginMutation, isPostSocialLoginPending };
};
