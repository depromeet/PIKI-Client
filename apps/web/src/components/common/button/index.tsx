'use client';

import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/utils/cn';

import { type ButtonStyleProps, buttonStyles } from './Button.style';

type ButtonProps = Omit<ComponentProps<'button'>, 'children'> &
  ButtonStyleProps & {
    leadingIcon?: ReactNode;
    children?: ReactNode;
  };

function Button({
  variant,
  size,
  icon,
  leadingIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(buttonStyles({ variant, size, icon }), className)} {...rest}>
      {icon === 'leading' && leadingIcon}
      {children}
    </button>
  );
}

export default Button;
