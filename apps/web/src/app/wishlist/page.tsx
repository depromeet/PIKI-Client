'use client';

import { useState } from 'react';

import BottomTabBar from '@/components/common/BottomTabBar';
import HeaderActions from '@/components/common/HeaderActions';

import ImageIconFill from '@/assets/icons/fill/image.svg';
import LinkIconFill from '@/assets/icons/fill/link.svg';

import WishAddModal from './_components/WishAddModal';
import WishFab from './_components/WishFab';
import WishListTabContent from './_components/WishListTabContent';
import WishTab from './_components/WishTab';
import { MOCK_WISH_ITEMS } from './mocks/wishMocks';
import type { WishTabT } from './types/wishTypes';

function WishlistPage() {
  const [activeTab, setActiveTab] = useState<WishTabT>('저장한 위시템');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-[#F6F7F8] px-[21px]">
      {/* 헤더: 타이틀 + 아이콘 액션 + 탭 */}
      <div className="sticky top-0 z-10 inline-flex w-full flex-col items-start gap-5 bg-[#F6F7F8] pt-[24px] pb-6">
        <div className="flex w-full flex-col gap-[5px]">
          <div className="flex justify-end">
            <HeaderActions />
          </div>
          <h1 className="text-[28px] font-bold leading-[137.5%] tracking-[-0.708px] text-[#171719]">위시</h1>
        </div>

        <WishTab activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 탭 콘텐츠 */}
      <main className="flex flex-1 flex-col pb-24">
        {activeTab === '저장한 위시템' && <WishListTabContent items={MOCK_WISH_ITEMS} />}
        {activeTab === '토너먼트 기록' && (
          // 토너먼트 기록 데이터 연결 전 임시 UI
          <div className="flex flex-1 items-center justify-center">
            <p className="body-1-medium text-gray-300">토너먼트 기록이 없어요</p>
          </div>
        )}
      </main>

      {/* 하단 탭 바 */}
      <div className="fixed bottom-[40px] left-1/2 -translate-x-1/2 z-20">
        <BottomTabBar />
      </div>

      {/* FAB */}
      <div className="fixed bottom-[43.21px] left-1/2 z-30 w-full max-w-120 -translate-x-1/2 px-[21px] pointer-events-none">
        <div className="flex justify-end">
          <div className="pointer-events-auto">
            <WishFab onAddItem={() => setIsAddModalOpen(true)} onDelete={() => {}} />
          </div>
        </div>
      </div>

      <WishAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="위시템 담기"
        options={[
          // TODO: 링크로 담기 페이지 연결
          { icon: <LinkIconFill width={20} height={20} />, label: '링크로 담기', description: '상품URL을 붙여넣어요', onClick: () => {} },
          // TODO: 이미지로 담기 페이지 연결
          { icon: <ImageIconFill width={20} height={20} />, label: '이미지로 담기', description: '스크린샷을 첨부해요', onClick: () => {} },
        ]}
      />
    </div>
  );
}

export default WishlistPage;
