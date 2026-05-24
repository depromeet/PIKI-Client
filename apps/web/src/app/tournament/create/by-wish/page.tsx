'use client';

import { useRouter } from 'next/navigation';

import { MOCK_WISH_ITEMS } from '@/app/wishlist/_mocks/wishMocks';
import WarningIconFill from '@/assets/icons/fill/warning.svg';
import Button from '@/components/common/button';
import Toast from '@/components/common/toast/Toast';
import ToastGradientOverlay from '@/components/common/toast/ToastGradientOverlay';

import WishSelectCard from './_components/WishSelectCard';
import WishSelectHeader from './_components/WishSelectHeader';
import { MAX_SELECT, MIN_SELECT } from './_consts/selectLimits';
import useWishSelection from './_hooks/useWishSelection';

function ByWishPage() {
  const router = useRouter();
  const { selectedIds, isMaxExceeded, handleSelect } = useWishSelection(MAX_SELECT);

  // TODO: 위시리스트 API 연결
  const items = MOCK_WISH_ITEMS;

  const handleNext = () => {
    // TODO: 선택된 ID 배열을 토너먼트 준비 페이지로 전달 (API 연동 시 query/state)
    router.push('/tournament/create');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-[#F4F4F6] px-5">
      {/* 헤더: 선택 안내 문구 + 선택 개수 */}
      <WishSelectHeader
        selectedCount={selectedIds.length}
        totalCount={items.length}
        isMaxExceeded={isMaxExceeded}
      />

      {/* 위시 아이템 그리드 */}
      <main className="mt-4 flex flex-1 flex-col pb-32">
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          {items.map(item => (
            <WishSelectCard
              key={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              isSelected={selectedIds.includes(item.id)}
              onSelect={() => handleSelect(item.id)}
            />
          ))}
        </div>
      </main>

      {/* 최대 선택 초과 토스트 */}
      <div className="fixed bottom-[78.2px] left-1/2 z-20 w-full max-w-120 -translate-x-1/2">
        <ToastGradientOverlay isVisible={isMaxExceeded} />
      </div>

      <div className="fixed bottom-[106px] left-1/2 z-20 w-full max-w-120 -translate-x-1/2 px-5">
        <Toast
          isVisible={isMaxExceeded}
          icon={<WarningIconFill width={26.787} height={26.787} />}
          message={`최대 ${MAX_SELECT}개까지 상품을 담을 수 있어요.\n다른 항목을 빼고 추가해주세요.`}
        />
      </div>

      {/* 하단 버튼: 뒤로 / 다음 */}
      <div className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-120 -translate-x-1/2 gap-[10px] bg-[#FFF] px-5 py-3 pt-4">
        <Button variant="secondary" size="lg" onClick={() => router.back()}>
          뒤로
        </Button>
        <Button
          variant="primary"
          size="lg"
          disabled={selectedIds.length < MIN_SELECT}
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

export default ByWishPage;
