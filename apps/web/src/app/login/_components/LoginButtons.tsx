'use client';

import { useCallback, useState } from 'react';

import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';

import AppleIcon from '@/assets/icons/social/apple.svg';
import GoogleIcon from '@/assets/icons/social/google.svg';
import KakaoIcon from '@/assets/icons/social/kakao.svg';
import Spinner from '@/components/spinner';
import { useNativeLoginResult } from '@/hooks/useNativeLoginResult';

import { getAuthUrl } from '../_apis/getAuthUrl';
import { usePostGuestLogin } from '../_hooks/usePostGuestLogin';
import SocialLoginButton from './SocialLoginButton';

type NativePendingProviderT = 'kakao' | 'google' | 'apple' | null;

function LoginButtons() {
  const { postGuestLoginMutation, isPostGuestLoginPending } = usePostGuestLogin();
  const [nativePendingProvider, setNativePendingProvider] = useState<NativePendingProviderT>(null);

  const handleNativeLoginSettled = useCallback(() => setNativePendingProvider(null), []);
  useNativeLoginResult({ onSettled: handleNativeLoginSettled });

  const isAnyPending = isPostGuestLoginPending || nativePendingProvider !== null;

  const postNativeMessage = (provider: 'kakao' | 'google' | 'apple') => {
    const rnWebView = (window as Window & { ReactNativeWebView?: { postMessage: (msg: string) => void } }).ReactNativeWebView;
    if (!rnWebView) return false;
    setNativePendingProvider(provider);
    rnWebView.postMessage(
      JSON.stringify({ type: WEBBRIDGE_MESSAGE_TYPE.REQUEST_SOCIAL_LOGIN, payload: { provider } })
    );
    return true;
  };

  const handleKakaoLogin = () => {
    if (postNativeMessage('kakao')) return;
    getAuthUrl('kakao').then(({ url }) => { window.location.href = url; });
  };

  const handleGoogleLogin = () => {
    if (postNativeMessage('google')) return;
    getAuthUrl('google').then(({ url }) => { window.location.href = url; });
  };

  const handleAppleLogin = async () => {
    if (postNativeMessage('apple')) return;
    const { url } = await getAuthUrl('apple');
    window.location.href = url;
  };

  const handleGuestLogin = () => {
    postGuestLoginMutation();
  };

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <SocialLoginButton
        variant="google"
        icon={<GoogleIcon width={20} height={20} aria-hidden />}
        label="구글 계정으로 시작하기"
        isLoading={nativePendingProvider === 'google'}
        disabled={isAnyPending && nativePendingProvider !== 'google'}
        onClick={handleGoogleLogin}
      />
      <SocialLoginButton
        variant="apple"
        icon={<AppleIcon width={20} height={20} aria-hidden />}
        label="Apple로 시작하기"
        isLoading={nativePendingProvider === 'apple'}
        disabled={isAnyPending && nativePendingProvider !== 'apple'}
        onClick={handleAppleLogin}
      />
      <SocialLoginButton
        variant="kakao"
        icon={<KakaoIcon width={20} height={20} aria-hidden />}
        label="카카오로 시작하기"
        isLoading={nativePendingProvider === 'kakao'}
        disabled={isAnyPending && nativePendingProvider !== 'kakao'}
        onClick={handleKakaoLogin}
      />

      <button
        type="button"
        disabled={isAnyPending}
        onClick={handleGuestLogin}
        className="mt-7 flex cursor-pointer items-center gap-1.5 body-2-medium text-text-neutral-secondary underline underline-offset-2 disabled:opacity-50"
      >
        {isPostGuestLoginPending ? <Spinner size={16} /> : null}
        비회원으로 시작하기
      </button>

      <p className="mt-9 text-center text-[11px] font-medium leading-[150%] tracking-[-0.232px] [font-feature-settings:'ss10'_on] text-text-neutral-tertiary">
        가입 시{' '}
        <span className="underline decoration-solid [text-decoration-skip-ink:none] [text-underline-position:from-font]">이용약관</span>
        {' 및 '}
        <span className="underline decoration-solid [text-decoration-skip-ink:none] [text-underline-position:from-font]">개인정보 처리방침</span>
        에 동의하게 됩니다.
      </p>
    </div>
  );
}

export default LoginButtons;
