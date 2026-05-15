'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonStyles = cva(
  'inline-flex items-center justify-center overflow-hidden transition-colors disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: [
          'border text-text-neutral-inverse',
          'bg-bg-neutral-primary border-bg-neutral-primary',
          'active:bg-gray-400 active:border-gray-400',
          'disabled:bg-gray-200 disabled:border-gray-200',
        ],
        secondary: [
          'border-[1.2px] text-text-neutral-primary',
          'bg-bg-layer-default border-gray-200',
          'active:bg-gray-50 active:border-border-neutral-muted active:text-text-neutral-tertiary',
          'disabled:bg-bg-layer-default disabled:border-border-neutral-muted disabled:text-text-neutral-tertiary',
        ],
      },
      size: {
        sm: 'rounded-[12px] body-2-semibold',
        md: 'rounded-[12px] body-1-semibold',
        lg: 'h-[54px] w-full rounded-[12px] body-1-semibold',
      },
      icon: {
        none: 'gap-0',
        leading: 'gap-2',
        only: 'rounded-full',
      },
    },
    compoundVariants: [
      { icon: ['none', 'leading'], size: 'sm', className: 'px-4 py-[10px]' },
      { icon: ['none', 'leading'], size: 'md', className: 'px-[18px] py-[10px]' },
      { icon: ['none', 'leading'], size: 'lg', className: 'px-5 py-3' },
      { icon: 'only', size: 'sm', className: 'p-[10px]' },
      { icon: 'only', size: 'md', className: 'p-3' },
      { icon: 'only', size: 'lg', className: 'size-14 p-[14px]' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      icon: 'none',
    },
  }
);

type ButtonStyleProps = VariantProps<typeof buttonStyles>;

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  ButtonStyleProps & {
    leadingIcon?: ReactNode;
    children?: ReactNode;
  };

function Button({
  variant,
  size,
  icon = 'none',
  leadingIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size, icon }), className)}
      {...rest}
    >
      {icon === 'leading' && leadingIcon}
      {children}
    </button>
  );
}

export default Button;
