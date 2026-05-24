'use client';

import { usePathname, useRouter } from 'next/navigation';

import HeartIconFill from '@/assets/icons/fill/heart.svg';
import HomeIconFill from '@/assets/icons/fill/home.svg';

const TABS = [
  { label: '홈', icon: HomeIconFill, href: '/home' },
  { label: '위시', icon: HeartIconFill, href: '/wishlist' },
] as const;

function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center rounded-[100px] bg-white p-1 shadow-[0_0_8px_0_rgba(0,0,0,0.04)]">
      {TABS.map(({ label, icon: Icon, href }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <button
            key={label}
            type="button"
            onClick={() => router.push(href)}
            className={`flex w-[100px] flex-col items-center justify-center gap-0.5 rounded-[100px] py-[9px] transition-colors ${
              isActive ? 'bg-[#F4F4F6] text-[#686F7E]' : 'text-[#ADB1BB]'
            }`}
          >
            <Icon width={24} height={24} />
            <span
              className="text-[11px] leading-[127.3%] font-medium tracking-[0.342px]"
              style={{ fontFeatureSettings: "'ss10' on" }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomTabBar;
