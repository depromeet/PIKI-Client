'use client';

import { useEffect, useRef, useState } from 'react';

import { useGetWishlist } from '@/hooks/useGetWishlist';
import { useSSEFallback } from '@/hooks/useSSEFallback';
import { hasParsingItems } from '@/utils/item';

import { useWishlistDelete } from '../_hooks/useDeleteWishes';
import { useShareIntentWish } from '../_hooks/useShareIntentWish';
import WishAddDialog from './WishAddDialog';
import WishlistBottomBar from './WishlistBottomBar';
import WishlistFabArea from './WishlistFabArea';
import WishlistTabContent from './WishlistTabContent';

function WishlistContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useShareIntentWish();
  const { wishlistData, fetchNextPage, hasNextPage } = useGetWishlist();

  const hasPendingItem = hasParsingItems(wishlistData);

  useSSEFallback(['wishlists'], hasPendingItem);
  const {
    isDeleteMode,
    selectedIds,
    isDeleteWishesPending,
    handleEnterDeleteMode,
    handleToggleSelect,
    handleConfirmDelete,
  } = useWishlistDelete();

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <main className="flex flex-1 flex-col pb-24">
        <WishlistTabContent
          items={wishlistData}
          isDeleteMode={isDeleteMode}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
        />
        <div ref={sentinelRef} />
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
