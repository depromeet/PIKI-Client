'use client';

import type { SocialProviderT } from '@piki/core';
import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import AppleIcon from '@/assets/icons/social/apple.svg';
import GoogleIcon from '@/assets/icons/social/google.svg';
import KakaoIcon from '@/assets/icons/social/kakao.svg';
import Spinner from '@/components/spinner';
import { QUERY_ACTION } from '@/consts/queryAction';
import { ROUTES } from '@/consts/route';
import { useNativeLoginResult } from '@/hooks/useNativeLoginResult';
import {
  getLoginPath,
  isValidLoginRedirectPath,
  setLoginRedirectPath,
} from '@/utils/loginRedirect';
import { WebBridge, isWebview } from '@/utils/webBridge';

import { getAuthUrl } from '../_apis/getAuthUrl';
import { usePostGuestLogin } from '../_hooks/usePostGuestLogin';
import SocialLoginButton from './SocialLoginButton';

type LoginButtonsProps = {
  redirect: string | null;
  action: string | null;
};

function LoginButtons({ redirect, action }: LoginButtonsProps) {
  const router = useRouter();
  const validRedirect = isValidLoginRedirectPath(redirect) ? redirect : null;

  const [nativePendingProvider, setNativePendingProvider] = useState<SocialProviderT | null>(null);

  const { postGuestLoginMutation, isPostGuestLoginPending } = usePostGuestLogin();
  const handleNativeLoginSettled = useCallback(() => setNativePendingProvider(null), []);
  useNativeLoginResult({ redirect: validRedirect, onSettled: handleNativeLoginSettled });

  useEffect(() => {
    const handleLoginError = () => {
      if (action === QUERY_ACTION.VALUE.SESSION_EXPIRED) {
        toast.error('로그인 정보가 만료됐어요. 다시 로그인해 주세요.');
        router.replace(getLoginPath(validRedirect), { scroll: false });
        return;
      }
      if (action === QUERY_ACTION.VALUE.SOCIAL_LOGIN_ERROR) {
        toast.error('요청을 처리하지 못했어요. 다시 시도해 주세요.');
        router.replace(getLoginPath(validRedirect), { scroll: false });
      }
    };

    /** NOTE: dev 모드에서는 strict mode 로 인해 두 번 실행되는 문제를 방지하기 위해 setTimeout 을 사용 */
    if (process.env.NODE_ENV === 'development') {
      const timer = window.setTimeout(handleLoginError, 0);
      return () => window.clearTimeout(timer);
    }

    handleLoginError();
  }, [action, validRedirect, router]);

  const isAnyPending = isPostGuestLoginPending || nativePendingProvider !== null;

  const postNativeMessage = (provider: SocialProviderT) => {
    if (!isWebview()) return false;

    setNativePendingProvider(provider);
    WebBridge.postMessage({
      type: WEBBRIDGE_MESSAGE_TYPE.REQUEST_SOCIAL_LOGIN,
      payload: { provider },
    });
    return true;
  };

  const handleKakaoLogin = () => {
    if (postNativeMessage('kakao')) return;

    setLoginRedirectPath(validRedirect);
    getAuthUrl('kakao', validRedirect).then(({ url }) => {
      window.location.href = url;
    });
  };

  const handleGoogleLogin = () => {
    if (postNativeMessage('google')) return;

    setLoginRedirectPath(validRedirect);
    getAuthUrl('google', validRedirect).then(({ url }) => {
      window.location.href = url;
    });
  };

  const handleAppleLogin = async () => {
    if (postNativeMessage('apple')) return;

    setLoginRedirectPath(validRedirect);
    const { url } = await getAuthUrl('apple', validRedirect);
    window.location.href = url;
  };

  const handleGuestLogin = () => {
    setLoginRedirectPath(validRedirect);
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

      <p className="mt-9 text-center font-features-['ss10'_on] text-[11px] leading-[150%] font-medium tracking-[-0.232px] text-text-neutral-tertiary">
        가입 시{' '}
        <Link
          href="/terms"
          className="underline decoration-solid [text-decoration-skip-ink:none] [text-underline-position:from-font]"
        >
          이용약관
        </Link>
        {' 및 '}
        <Link
          href={ROUTES.POLICY}
          className="underline decoration-solid [text-decoration-skip-ink:none] [text-underline-position:from-font]"
        >
          개인정보 처리방침
        </Link>
        에 동의하게 됩니다.
      </p>
    </div>
  );
}

export default LoginButtons;
