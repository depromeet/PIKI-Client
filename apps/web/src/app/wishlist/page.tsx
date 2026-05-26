'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import TrashIconFill from '@/assets/icons/fill/trash.svg';
import BottomTabBar from '@/components/common/bottom-tab-bar';
import { Header, HeaderIcon } from '@/components/common/header';
import { Toaster } from '@/components/common/toast';
import { useDeleteWish } from '@/hooks/useDeleteWish';
import { useGetWishlist } from '@/hooks/useGetWishlist';

import WishAddDialog from './_components/WishAddDialog';
import WishFab from './_components/WishFab';
import WishListTabContent from './_components/WishListTabContent';
import WishTab from './_components/WishTab';
import type { WishTabT } from './_types/wishTypes';

function WishlistPage() {
  const [activeTab, setActiveTab] = useState<WishTabT>('저장한 위시템');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // 위시리스트 조회 (GET /api/v1/wishlists)
  const { data: items = [] } = useGetWishlist();
  // 선택한 위시 삭제 (DELETE /api/v1/wishlists/{wishId})
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

  const handleConfirmDelete = async () => {
    if (selectedIds.size === 0) return;
    try {
      await Promise.all([...selectedIds].map(id => deleteWishlistMutation(id)));
      setSelectedIds(new Set());
      setIsDeleteMode(false);
      toast.success('선택한 위시를 삭제했어요');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-bg-layer-basement">
      {/* 헤더: 타이틀 + 아이콘 액션 + 탭 */}
      <div className="sticky top-0 z-10 inline-flex w-full flex-col items-start gap-5 bg-bg-layer-basement pt-[24px] pb-6">
        <div className="flex w-full flex-col gap-[5px]">
          <Header
            right={
              <>
                <HeaderIcon name="PROFILE" />
                <HeaderIcon name="ALARM" />
              </>
            }
          />
          <h1 className="px-5 text-[28px] leading-[137.5%] font-bold tracking-[-0.708px] text-[#171719]">
            위시
          </h1>
        </div>

        <WishTab activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 탭 콘텐츠 */}
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
          // 토너먼트 기록 데이터 연결 전 임시 UI
          <div className="flex flex-1 items-center justify-center">
            <p className="body-1-medium text-gray-300">토너먼트 기록이 없어요</p>
          </div>
        )}
      </main>

      {/* 하단 탭 바 + 선택 칩 */}
      <div className="fixed bottom-[40px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {isDeleteMode ? (
          <div className="flex h-[68px] w-[168px] items-center justify-center rounded-full bg-bg-layer-default shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)]">
            <span className="body-1-bold text-text-neutral-primary">
              {selectedIds.size}개 선택됨
            </span>
          </div>
        ) : (
          <BottomTabBar />
        )}
      </div>

      {/* FAB */}
      <div className="pointer-events-none fixed right-0 bottom-[43.21px] left-0 z-30 mx-auto w-full max-w-120 px-[21px]">
        <div className="flex justify-end">
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
      </div>

      {/* 삭제 완료 토스트 */}
      <Toaster mobileOffset={{ bottom: '146px' }} />

      <WishAddDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}

export default WishlistPage;
