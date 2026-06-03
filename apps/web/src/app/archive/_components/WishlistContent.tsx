'use client';

import { useState } from 'react';

import { useWishlistDelete } from '../_hooks/useDeleteWishes';
import { useGetWishlist } from '../_hooks/useGetWishlist';
import WishAddDialog from './WishAddDialog';
import WishlistBottomBar from './WishlistBottomBar';
import WishlistFabArea from './WishlistFabArea';
import WishlistTabContent from './WishlistTabContent';

function WishlistContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: wishlistData } = useGetWishlist();
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
