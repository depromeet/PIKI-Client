'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/utils/cn';

import { type ButtonStyleProps, buttonStyles } from './Button.style';

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'children'> &
  ButtonStyleProps & {
    leadingIcon?: ReactNode;
    children?: ReactNode;
  };

function ButtonLink({
  variant,
  size,
  icon = 'none',
  leadingIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonStyles({ variant, size, icon }), className)} {...rest}>
      {icon === 'leading' && leadingIcon}
      {children}
    </Link>
  );
}

export default ButtonLink;
