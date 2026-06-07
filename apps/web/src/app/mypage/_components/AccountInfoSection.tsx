import Link from 'next/link';

import { ROUTES } from '@/consts/route';

import { MYPAGE_EXTERNAL_LINKS } from '../_consts/mypage';
import LogoutMenuItem from './LogoutMenuItem';

function AccountInfoSection() {
  return (
    <section className="flex w-full flex-col gap-3">
      <h2 className="body-1-bold text-gray-900">계정 및 정보</h2>
      <div className="flex flex-col divide-y divide-border-neutral-muted rounded-xl bg-bg-layer-default px-4">
        <LogoutMenuItem />
        <AccountLinkItem href={ROUTES.MYPAGE_WITHDRAW} label="탈퇴하기" />
        <AccountLinkItem href={MYPAGE_EXTERNAL_LINKS.TERMS} label="이용약관" />
        <AccountLinkItem href={MYPAGE_EXTERNAL_LINKS.PRIVACY} label="개인정보 처리방침" />
      </div>
    </section>
  );
}

type AccountLinkItemProps = {
  href: string;
  label: string;
  isExternal?: boolean;
};

function AccountLinkItem({ href, label, isExternal = false }: AccountLinkItemProps) {
  return (
    <Link
      href={href}
      className="flex w-full cursor-pointer items-center px-2 py-5 body-1-semibold text-text-neutral-secondary"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </Link>
  );
}

export default AccountInfoSection;
