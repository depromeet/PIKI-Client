'use client';

import type { ComponentProps, ReactNode } from 'react';

import Spinner from '@/components/spinner';
import { cn } from '@/utils/cn';

import { type ButtonStyleProps, buttonStyles } from './button.style';

type ButtonProps = Omit<ComponentProps<'button'>, 'children'> &
  ButtonStyleProps & {
    leadingIcon?: ReactNode;
    children?: ReactNode;
    isLoading?: boolean;
  };

function Button({
  variant,
  size,
  icon,
  leadingIcon,
  className,
  children,
  isLoading,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading || rest.disabled}
      className={cn(buttonStyles({ variant, size, icon }), className)}
      {...rest}
    >
      {isLoading ? (
        <Spinner size={24} />
      ) : (
        <>
          {icon === 'leading' && leadingIcon}
          {children}
        </>
      )}
    </button>
  );
}

export default Button;
