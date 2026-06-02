'use client';

import { useEffect, useRef } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

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

  const { postSocialLoginMutation, isError } = usePostSocialLogin(
    isValidProvider ? provider : 'kakao'
  );

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

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-28">
        <p className="body-1-medium text-text-neutral-secondary">
          로그인에 실패했습니다. 다시 시도해 주세요.
        </p>
        <button
          type="button"
          onClick={() => router.replace('/login')}
          className="cursor-pointer body-2-medium text-text-neutral-secondary underline underline-offset-2"
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return null;
}

export default CallbackHandler;
