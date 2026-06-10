'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useGetWishlist } from '../../../hooks/useGetWishlist';
import { useWishlistDelete } from '../_hooks/useDeleteWishes';
import { useShareIntentWish } from '../_hooks/useShareIntentWish';
import WishAddDialog from './WishAddDialog';
import WishlistBottomBar from './WishlistBottomBar';
import WishlistFabArea from './WishlistFabArea';
import WishlistTabContent from './WishlistTabContent';

function WishlistContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useShareIntentWish();
  const { data: wishlistData } = useGetWishlist();
  const queryClient = useQueryClient();

  const hasPendingItem = wishlistData.some(
    item => item.status === 'PENDING' || item.status === 'PROCESSING'
  );

  // SSE 이벤트가 오지 않는 경우를 대비한 fallback: PENDING/PROCESSING 아이템이 있으면
  // 60초 후 wishlists 쿼리를 강제로 한 번 refetch한다.
  useEffect(() => {
    if (!hasPendingItem) return;
    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['wishlists'] });
    }, 60_000);
    return () => clearTimeout(timer);
  }, [hasPendingItem, queryClient]);
  const {
    isDeleteMode,
    selectedIds,
    isDeleteWishesPending,
    handleEnterDeleteMode,
    handleToggleSelect,
    handleConfirmDelete,
  } = useWishlistDelete();

  return (
    <>
      <main className="flex flex-1 flex-col pb-24">
        <WishlistTabContent
          items={wishlistData}
          isDeleteMode={isDeleteMode}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
        />
      </main>

      <WishlistBottomBar isDeleteMode={isDeleteMode} selectedCount={selectedIds.size} />

      <WishlistFabArea
        isDeleteMode={isDeleteMode}
        isDeleteWishesPending={isDeleteWishesPending}
        isDeleteDisabled={selectedIds.size === 0}
        onAddItem={() => setIsAddDialogOpen(true)}
        onEnterDeleteMode={handleEnterDeleteMode}
        onConfirmDelete={handleConfirmDelete}
      />

      <WishAddDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </>
  );
}

export default WishlistContent;
