'use client';

import type { SocialProviderT } from '@piki/core';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import Spinner from '@/components/spinner';
import { ROUTES } from '@/consts/route';
import {
  clearLoginRedirectPath,
  getLoginPath,
  getLoginRedirectPath,
  isValidLoginRedirectPath,
} from '@/utils/loginRedirect';

import { usePostSocialLogin } from '../_hooks/usePostSocialLogin';

function isSocialProvider(value: string): value is SocialProviderT {
  return value === 'kakao' || value === 'google' || value === 'apple';
}

function CallbackHandler() {
  const params = useParams<{ provider: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasCalled = useRef(false);

  const provider = params.provider;
  const isValidProvider = isSocialProvider(provider);

  const { postSocialLoginMutation } = usePostSocialLogin(isValidProvider ? provider : 'kakao');

  useEffect(() => {
    if (hasCalled.current) return;

    /** 로그인 이후 redirect path 확인 */
    const redirectParam = searchParams.get('redirect');
    const redirect = getLoginRedirectPath(redirectParam);
    clearLoginRedirectPath();

    /** /home이 아닌 redirect path가 있으면 해당 path로 리다이렉트 */
    const loginRedirect =
      isValidLoginRedirectPath(redirectParam) || redirect !== ROUTES.HOME ? redirect : null;
    const loginPath = getLoginPath(loginRedirect);

    if (!isValidProvider) {
      router.replace(loginPath);
      return;
    }

    const code = searchParams.get('code');
    if (!code) {
      router.replace(loginPath);
      return;
    }

    const state = searchParams.get('state');
    if (!state) {
      router.replace(loginPath);
      return;
    }

    hasCalled.current = true;
    postSocialLoginMutation({
      code,
      redirect: loginRedirect,
      redirectUri: `${window.location.origin}${ROUTES.SOCIAL_LOGIN_CALLBACK(provider)}`,
      state,
    });
  }, [isValidProvider, postSocialLoginMutation, provider, router, searchParams]);

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-3 pt-padding-top">
      <Spinner size={32} />
      <p className="text-sm text-text-neutral-secondary">로그인 중...</p>
    </div>
  );
}

export default CallbackHandler;
