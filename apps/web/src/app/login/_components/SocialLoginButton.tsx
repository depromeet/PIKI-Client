'use client';

import type { ReactNode } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const socialButtonStyles = cva(
  'flex h-[54px] w-full cursor-pointer items-center justify-center gap-[9px] rounded-[14px]',
  {
    variants: {
      variant: {
        google: 'border border-gray-200 bg-white',
        apple: 'bg-[#1A1A1A]',
        kakao: 'bg-[#FEE500]',
      },
    },
  }
);

const labelStyles = cva(
  'text-[16px] font-semibold leading-6 tracking-[-0.312px]',
  {
    variants: {
      variant: {
        google: 'text-text-neutral-primary',
        apple: 'text-white',
        kakao: 'text-text-neutral-primary',
      },
    },
  }
);

type SocialLoginButtonProps = {
  variant: 'google' | 'apple' | 'kakao';
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
};

function SocialLoginButton({ variant, icon, label, onClick, className }: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(socialButtonStyles({ variant }), className)}
    >
      {icon}
      <span className={labelStyles({ variant })}>{label}</span>
    </button>
  );
}

export default SocialLoginButton;
