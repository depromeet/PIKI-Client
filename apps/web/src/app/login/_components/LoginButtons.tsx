'use client';

import { useSearchParams } from 'next/navigation';

import AppleIcon from '@/assets/icons/social/apple.svg';
import GoogleIcon from '@/assets/icons/social/google.svg';
import KakaoIcon from '@/assets/icons/social/kakao.svg';
import { isValidLoginRedirectPath } from '@/utils/loginRedirect';

import { getAuthUrl } from '../_apis/getAuthUrl';
import { usePostGuestLogin } from '../_hooks/usePostGuestLogin';
import SocialLoginButton from './SocialLoginButton';

function LoginButtons() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { postGuestLoginMutation } = usePostGuestLogin();

  const handleKakaoLogin = async () => {
    const { url } = await getAuthUrl(
      'kakao',
      isValidLoginRedirectPath(redirect) ? redirect : null
    );
    window.location.href = url;
  };

  const handleGoogleLogin = async () => {
    const { url } = await getAuthUrl(
      'google',
      isValidLoginRedirectPath(redirect) ? redirect : null
    );
    window.location.href = url;
  };

  const handleAppleLogin = () => {};

  const handleGuestLogin = () => {
    postGuestLoginMutation();
  };

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <SocialLoginButton
        variant="google"
        icon={<GoogleIcon width={20} height={20} aria-hidden />}
        label="구글 계정으로 시작하기"
        onClick={handleGoogleLogin}
      />
      <SocialLoginButton
        variant="apple"
        icon={<AppleIcon width={20} height={20} aria-hidden />}
        label="Apple로 시작하기"
        onClick={handleAppleLogin}
      />
      <SocialLoginButton
        variant="kakao"
        icon={<KakaoIcon width={20} height={20} aria-hidden />}
        label="카카오로 시작하기"
        onClick={handleKakaoLogin}
      />

      <button
        type="button"
        onClick={handleGuestLogin}
        className="mt-7 cursor-pointer body-2-medium text-text-neutral-secondary underline underline-offset-2"
      >
        비회원으로 시작하기
      </button>

      <p className="mt-9 text-center text-[11px] font-medium leading-[150%] tracking-[-0.232px] font-features-['ss10'_on] text-text-neutral-tertiary">
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
