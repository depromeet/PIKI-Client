'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import type { SocialProviderT } from '@/types/auth';

import { usePostSocialLogin } from '../_hooks/usePostSocialLogin';

const SUPPORTED_PROVIDERS: SocialProviderT[] = ['kakao', 'google'];

function isSocialProvider(value: string): value is SocialProviderT {
  return (SUPPORTED_PROVIDERS as string[]).includes(value);
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

    if (!isValidProvider) {
      router.replace('/login');
      return;
    }

    const code = searchParams.get('code');
    if (!code) {
      router.replace('/login');
      return;
    }

    const state = searchParams.get('state');
    if (!state) {
      router.replace('/login');
      return;
    }

    hasCalled.current = true;
    const redirectUri = `${window.location.origin}/auth/callback/${provider}`;
    postSocialLoginMutation({ code, redirectUri, state });
  }, [isValidProvider, postSocialLoginMutation, provider, router, searchParams]);

  return null;
}

export default CallbackHandler;
