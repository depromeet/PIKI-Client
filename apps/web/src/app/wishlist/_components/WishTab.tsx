'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/utils/cn';

import type { WishTabT } from '../_types/wishTypes';

const TABS: WishTabT[] = ['저장한 위시템', '토너먼트 기록'];

const TAB_PARAM: Record<WishTabT, string> = {
  '저장한 위시템': 'wish',
  '토너먼트 기록': 'tournament',
};

const PARAM_TAB: Record<string, WishTabT> = {
  wish: '저장한 위시템',
  tournament: '토너먼트 기록',
};

function WishTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab: WishTabT = PARAM_TAB[searchParams.get('tab') ?? ''] ?? '저장한 위시템';

  const handleTabChange = (tab: WishTabT) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', TAB_PARAM[tab]);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="w-full px-5">
      <div className="flex h-12 items-center rounded-xl bg-[#E7E8EA] p-1">
        {TABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab)}
            className={cn(
              'flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 body-1-semibold transition-colors',
              activeTab === tab
                ? 'rounded-lg bg-white text-gray-900 shadow-[0_0_8px_0_rgba(0,0,0,0.08)]'
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
