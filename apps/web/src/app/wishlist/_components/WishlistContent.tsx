'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Toaster } from '@/components/common/toast';

import { useGetWishlist } from '../_hooks/useGetWishlist';
import { useWishlistDelete } from '../_hooks/useWishlistDelete';
import type { WishTabT } from '../_types/wishTypes';
import WishAddDialog from './WishAddDialog';
import WishlistBottomBar from './WishlistBottomBar';
import WishlistFabArea from './WishlistFabArea';
import WishlistTabContent from './WishlistTabContent';

const PARAM_TAB: Record<string, WishTabT> = {
  tournament: '토너먼트 기록',
};

function WishlistContent() {
  const searchParams = useSearchParams();
  const activeTab: WishTabT = PARAM_TAB[searchParams.get('tab') ?? ''] ?? '저장한 위시템';

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: items } = useGetWishlist();
  const { isDeleteMode, selectedIds, handleEnterDeleteMode, handleToggleSelect, handleConfirmDelete } =
    useWishlistDelete();

  return (
    <>
      <main className="flex flex-1 flex-col px-5 pb-24">
        {activeTab === '저장한 위시템' && (
          <WishlistTabContent
            items={items}
            isDeleteMode={isDeleteMode}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
          />
        )}
        {activeTab === '토너먼트 기록' && (
          <div className="flex flex-1 items-center justify-center">
            <p className="body-1-medium text-gray-300">토너먼트 기록이 없어요</p>
          </div>
        )}
      </main>

      <WishlistBottomBar isDeleteMode={isDeleteMode} selectedCount={selectedIds.size} />

      <WishlistFabArea
        isDeleteMode={isDeleteMode}
        isDeleteDisabled={selectedIds.size === 0}
        onAddItem={() => setIsAddDialogOpen(true)}
        onEnterDeleteMode={handleEnterDeleteMode}
        onConfirmDelete={handleConfirmDelete}
      />

      <Toaster mobileOffset={{ bottom: '146px' }} />
      <WishAddDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </>
  );
}

export default WishlistContent;
