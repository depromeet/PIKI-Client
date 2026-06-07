import Link from 'next/link';
import type { ReactNode } from 'react';

type AccountLinkItemProps = {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
};

function AccountLinkItem({ href, children, isExternal = false }: AccountLinkItemProps) {
  return (
    <Link
      href={href}
      className="flex w-full cursor-pointer items-center px-2 py-3 body-1-semibold text-text-neutral-secondary"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </Link>
  );
}

export default AccountLinkItem;
