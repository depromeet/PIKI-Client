'use client';

import Image from 'next/image';
import { useState } from 'react';

import AddItemSheet from '@/components/AddItemSheet';
import { useWishes } from '@/hooks/useWishes';
import type { WishT } from '@/types/wish';

const TARGET_COUNT = 8;

function HomePage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const wishesQuery = useWishes();

  const wishes = wishesQuery.data ?? [];
  const count = wishes.length;
  const isEmpty = count === 0;
  const isComplete = count >= TARGET_COUNT;

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const renderHeader = () => {
    if (isEmpty) return <EmptyHeader />;
    if (isComplete) return <CompleteHeader />;
    return <ProgressHeader count={count} remaining={TARGET_COUNT - count} />;
  };

  return (
    <main className="relative flex h-full flex-col overflow-x-hidden px-5 pt-[calc(env(safe-area-inset-top)+60px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      {renderHeader()}

      <div className="relative mx-auto mt-32 aspect-259/373 w-[85%]">
        <Image
          src="/images/home-empty-basket-v2.png"
          alt="빈 장바구니"
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          priority
          className="object-contain"
        />

        {isEmpty ? (
          <CenterAddButton onClick={handleOpenSheet} />
        ) : (
          <BasketContents
            wishes={wishes}
            showAddButton={!isComplete}
            onAddClick={handleOpenSheet}
          />
        )}
      </div>

      <button
        type="button"
        disabled={!isComplete}
        className="mt-auto h-14 w-full shrink-0 rounded-[14px] bg-[#1B1C1E] text-base leading-normal font-semibold tracking-[0.0912px] text-[#F7F7F8] disabled:bg-[#E5E7EB] disabled:text-[#A4A4A4]"
      >
        토너먼트 시작하기
      </button>

      <AddItemSheet open={isSheetOpen} onClose={handleCloseSheet} />
    </main>
  );
}

function EmptyHeader() {
  return (
    <>
      <h1 className="text-center text-[28px] leading-snug font-bold tracking-[-0.7084px] text-[#171719]">
        고민 중인 것들, 여기 모아봐요
      </h1>
      <p className="mt-2 text-center text-base leading-snug font-semibold tracking-[-0.4048px] text-[#A4A4A4]">
        8개가 모이면 하나를 골라드릴게요
      </p>
    </>
  );
}

type ProgressHeaderProps = {
  count: number;
  remaining: number;
};

function ProgressHeader({ count, remaining }: ProgressHeaderProps) {
  return (
    <>
      <h1 className="text-center text-[28px] leading-snug font-bold tracking-[-0.7084px] text-[#171719]">
        {count}개 담았어요
      </h1>
      <p className="mt-2 text-center text-base leading-snug font-semibold tracking-[-0.4048px] text-[#A4A4A4]">
        {remaining}개 더 담으면 토너먼트 시작!
      </p>
    </>
  );
}

function CompleteHeader() {
  return (
    <>
      <h1 className="text-center text-[28px] leading-snug font-bold tracking-[-0.7084px] text-[#171719]">
        다 모였어요!
      </h1>
      <p className="mt-2 text-center text-sm leading-snug font-semibold text-[#A4A4A4]">
        이제 토너먼트를 통해 하나만 남겨볼게요
      </p>
    </>
  );
}

type AddButtonProps = {
  onClick: () => void;
  className?: string;
};

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F7F7F8"
      strokeWidth={2.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6.5 w-6.5"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CenterAddButton({ onClick }: AddButtonProps) {
  return (
    <button
      type="button"
      aria-label="아이템 추가"
      onClick={onClick}
      className="absolute top-1/2 left-1/2 flex h-13.75 w-13.75 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1B1C1E]"
    >
      <PlusIcon />
    </button>
  );
}

function SlotAddButton({ onClick }: AddButtonProps) {
  return (
    <div className="flex aspect-square items-center justify-center">
      <button
        type="button"
        aria-label="아이템 추가"
        onClick={onClick}
        className="flex size-11 items-center justify-center rounded-full bg-[#1B1C1E]"
      >
        <PlusIcon />
      </button>
    </div>
  );
}

type BasketContentsProps = {
  wishes: WishT[];
  showAddButton: boolean;
  onAddClick: () => void;
};

function BasketContents({ wishes, showAddButton, onAddClick }: BasketContentsProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="grid h-[80%] w-[58%] auto-rows-fr grid-cols-2 grid-rows-4 gap-3">
        {wishes.slice(0, TARGET_COUNT).map(wish => (
          <div
            key={wish.wishId}
            className="relative aspect-square overflow-hidden rounded-2xl border-2 border-white bg-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
          >
            {wish.imageUrl ? (
              // dataURL과 일반 URL 모두 native img로 처리
              // eslint-disable-next-line @next/next/no-img-element
              <img src={wish.imageUrl} alt={wish.name} className="size-full object-cover" />
            ) : null}
          </div>
        ))}
        {showAddButton && <SlotAddButton onClick={onAddClick} />}
      </div>
    </div>
  );
}

export default HomePage;
