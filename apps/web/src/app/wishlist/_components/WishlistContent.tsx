'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import TrashIconFill from '@/assets/icons/fill/trash.svg';
import BottomTabBar from '@/components/common/bottom-tab-bar';
import { Toaster } from '@/components/common/toast';

import { useDeleteWish } from '../_hooks/useDeleteWish';
import { useGetWishlist } from '../_hooks/useGetWishlist';
import type { WishTabT } from '../_types/wishTypes';
import WishAddDialog from './WishAddDialog';
import WishFab from './WishFab';
import WishListTabContent from './WishListTabContent';

const PARAM_TAB: Record<string, WishTabT> = {
  tournament: '토너먼트 기록',
};

function WishlistContent() {
  const searchParams = useSearchParams();
  const activeTab: WishTabT = PARAM_TAB[searchParams.get('tab') ?? ''] ?? '저장한 위시템';

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const { data: items } = useGetWishlist();
  const { mutateAsync: deleteWishlistMutation } = useDeleteWish();

  const handleEnterDeleteMode = () => {
    setIsDeleteMode(true);
    setSelectedIds(new Set());
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // TODO: 다중 삭제 API 구현 후 부분 성공/실패 처리 추가
  const handleConfirmDelete = async () => {
    if (selectedIds.size === 0) return;
    try {
      await Promise.all([...selectedIds].map(id => deleteWishlistMutation(id)));
      toast.success('선택한 위시를 삭제했어요');
    } finally {
      setSelectedIds(new Set());
      setIsDeleteMode(false);
    }
  };

  return (
    <>
      <main className="flex flex-1 flex-col px-5 pb-24">
        {activeTab === '저장한 위시템' && (
          <WishListTabContent
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

      <div className="fixed bottom-[40px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {isDeleteMode ? (
          <div className="flex h-[68px] w-[168px] items-center justify-center rounded-full bg-bg-layer-default shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)]">
            <span className="body-1-bold text-text-neutral-primary">{selectedIds.size}개 선택됨</span>
          </div>
        ) : (
          <BottomTabBar />
        )}
      </div>

      <div className="pointer-events-none fixed right-0 bottom-[43.21px] left-0 z-30 mx-auto flex w-full max-w-120 justify-end px-[21px]">
        <div className="pointer-events-auto">
          {isDeleteMode ? (
            <button
              type="button"
              onClick={handleConfirmDelete}
              aria-label="선택한 위시 삭제하기"
              disabled={selectedIds.size === 0}
              className="flex size-[62px] items-center justify-center rounded-full border border-border-neutral-muted bg-bg-layer-default shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] disabled:opacity-50"
            >
              <TrashIconFill width={33} height={33} className="text-icon-neutral-primary" />
            </button>
          ) : (
            <WishFab
              onAddItem={() => setIsAddDialogOpen(true)}
              onDelete={handleEnterDeleteMode}
            />
          )}
        </div>
      </div>

      <Toaster mobileOffset={{ bottom: '146px' }} />
      <WishAddDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </>
  );
}

export default WishlistContent;
