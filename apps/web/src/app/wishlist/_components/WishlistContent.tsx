'use client';

import { useState } from 'react';

import { Toaster } from '@/components/common/toast';

import { useGetWishlist } from '../_hooks/useGetWishlist';
import { useWishlistDelete } from '../_hooks/useWishlistDelete';
import WishAddDialog from './WishAddDialog';
import WishlistBottomBar from './WishlistBottomBar';
import WishlistFabArea from './WishlistFabArea';
import WishlistTabContent from './WishlistTabContent';

function WishlistContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: items } = useGetWishlist();
  const { isDeleteMode, selectedIds, handleEnterDeleteMode, handleToggleSelect, handleConfirmDelete } =
    useWishlistDelete();

  return (
    <>
      <main className="flex flex-1 flex-col px-5 pb-24">
        <WishlistTabContent
          items={items}
          isDeleteMode={isDeleteMode}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
        />
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
