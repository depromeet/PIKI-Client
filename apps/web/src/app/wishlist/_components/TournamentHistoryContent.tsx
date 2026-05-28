'use client';

import { useState } from 'react';

import BottomTabBar from '@/components/common/bottom-tab-bar';

import WishAddDialog from './WishAddDialog';
import WishlistFabArea from './WishlistFabArea';

function TournamentHistoryContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
      <main className="flex flex-1 items-center justify-center">
        <p className="body-1-medium text-gray-300">토너먼트 기록이 없어요</p>
      </main>
      <div className="fixed bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <BottomTabBar />
      </div>
      <WishlistFabArea
        isDeleteMode={false}
        isDeleteDisabled={true}
        onAddItem={() => setIsAddDialogOpen(true)}
        // TODO: 토너먼트 기록 삭제 API 생기면 구현
        onEnterDeleteMode={() => {}}
        onConfirmDelete={() => {}}
      />
      <WishAddDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </>
  );
}

export default TournamentHistoryContent;
