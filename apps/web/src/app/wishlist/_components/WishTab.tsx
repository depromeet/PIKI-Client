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
      <div className="flex h-[48px] items-center rounded-[12px] bg-[#E7E8EA] p-1">
        {TABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab)}
            className={cn(
              'flex h-[40px] flex-1 items-center justify-center gap-2 text-[16.203px] leading-normal font-semibold transition-colors',
              activeTab === tab
                ? 'rounded-[8px] bg-white text-[#000] shadow-[0_0_8px_0_rgba(0,0,0,0.08)]'
                : 'text-gray-400'
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
