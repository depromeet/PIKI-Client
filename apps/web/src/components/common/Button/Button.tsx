'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';

import { type ButtonStyleProps, buttonStyles } from './Button.style';

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
