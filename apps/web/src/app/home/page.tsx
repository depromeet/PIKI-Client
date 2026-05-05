'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AddItemModal from '@/components/AddItemModal';
import { useWishes } from '@/hooks/useWishes';
import { DUMMY_POSITIONS, isDummyProduct } from '@/mocks/dummyWishes';
import type { ProductT } from '@/types/product';

function HomePage() {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const wishesQuery = useWishes();

  const wishes = wishesQuery.data ?? [];
  const userWish = wishes.find(wish => !isDummyProduct(wish));
  const hasUserWish = Boolean(userWish);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handleStartTournament = () => {
    router.push('/tournament/loading');
  };

  return (
    <main className="relative flex h-full flex-col overflow-x-hidden pt-[calc(env(safe-area-inset-top)+24px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <header className="px-6 text-center">
        <h1 className="text-[28px] leading-10 font-bold tracking-[-0.6px] text-[#171719]">
          고민 중인 것들, 여기 모아봐요
        </h1>
        <p className="mt-2 text-lg leading-6.5 font-medium tracking-[-0.6px] text-[#ADB1BB]">
          8개가 모이면 하나를 골라드릴게요
        </p>
      </header>

      <section className="relative mt-7 flex flex-1 items-center justify-center px-5">
        <div className="@container relative aspect-358/502 h-full max-h-125.5 w-full max-w-89.5">
          <Image
            src="/images/home-empty-basket-v2.png"
            alt="장바구니"
            fill
            sizes="(max-width: 480px) calc(100vw - 40px), 358px"
            priority
            className="object-contain"
          />

          {DUMMY_POSITIONS.map(position => (
            <DummyEmojiCard
              key={position.emoji}
              emoji={position.emoji}
              top={position.top}
              left={position.left}
            />
          ))}

          {hasUserWish && userWish ? (
            <UserWishCard wish={userWish} />
          ) : (
            <CenterAddButton onClick={handleOpenSheet} />
          )}
        </div>
      </section>

      <div className="mt-6 px-5">
        <button
          type="button"
          disabled={!hasUserWish}
          onClick={handleStartTournament}
          className="flex h-13.5 w-full shrink-0 items-center justify-center rounded-xl bg-[#191B1F] px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-white disabled:bg-[#C5C8CE] disabled:text-white"
        >
          토너먼트 시작하기
        </button>
      </div>

      <AddItemModal open={isSheetOpen} onClose={handleCloseSheet} />
    </main>
  );
}

type DummyEmojiCardProps = {
  emoji: string;
  top: number;
  left: number;
};

function DummyEmojiCard({ emoji, top, left }: DummyEmojiCardProps) {
  return (
    <div
      className="absolute flex aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border-[3px] border-white bg-white shadow-[0_0_8px_rgba(0,0,0,0.16)]"
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      <span className="text-[19cqw] leading-none">{emoji}</span>
    </div>
  );
}

type UserWishCardProps = {
  wish: ProductT;
};

function UserWishCard({ wish }: UserWishCardProps) {
  return (
    <div className="absolute top-1/2 left-1/2 aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-[3px] border-white bg-white shadow-[0_0_8px_rgba(0,0,0,0.16)]">
      {wish.imagePath ? (
        // dataURL과 일반 URL 모두 native img로 처리
        // eslint-disable-next-line @next/next/no-img-element
        <img src={wish.imagePath} alt={wish.name} className="size-full object-cover" />
      ) : null}
    </div>
  );
}

type CenterAddButtonProps = {
  onClick: () => void;
};

function CenterAddButton({ onClick }: CenterAddButtonProps) {
  return (
    <button
      type="button"
      aria-label="아이템 추가"
      onClick={onClick}
      className="absolute top-1/2 left-1/2 flex aspect-square w-[18%] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#191B1F]"
    >
      <PlusIcon />
    </button>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      fill="none"
      stroke="#F7F7F8"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[9.5cqw]"
    >
      <line x1="15" y1="6" x2="15" y2="24" />
      <line x1="6" y1="15" x2="24" y2="15" />
    </svg>
  );
}

export default HomePage;
