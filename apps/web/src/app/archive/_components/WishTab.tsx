'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { ROUTES } from '@/consts/route';
import type { ItemTypeT } from '@/types/item';
import { cn } from '@/utils/cn';

import type { WishTabT } from '../_types/wish';

const TABS: WishTabT[] = ['저장한 위시템', '토너먼트 기록'];

const TAB_TYPE: Record<WishTabT, ItemTypeT> = {
  '저장한 위시템': 'wish',
  '토너먼트 기록': 'tournament',
};

const TYPE_TAB: Record<ItemTypeT, WishTabT> = {
  wish: '저장한 위시템',
  tournament: '토너먼트 기록',
};

function WishTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab: WishTabT =
    tabParam === 'wish' || tabParam === 'tournament' ? TYPE_TAB[tabParam] : '저장한 위시템';

  const handleTabChange = (tab: WishTabT) => {
    router.replace(ROUTES.ARCHIVE(TAB_TYPE[tab]));
  };

  return (
    <div className="w-full">
      <div className="flex h-[48px] items-center rounded-[12px] bg-gray-75 p-1">
        {TABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab)}
            className={cn(
              'flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 body-1-semibold transition-colors',
              activeTab === tab
                ? 'rounded-lg bg-white text-text-neutral-primary shadow-[0_0_8px_0_rgba(0,0,0,0.08)]'
                : 'text-black/30'
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WishTab;
