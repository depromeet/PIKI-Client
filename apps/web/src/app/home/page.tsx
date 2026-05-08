'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import mockImg1 from '@/assets/images/home/mock-1-tshirt.png';
import mockImg2 from '@/assets/images/home/mock-2-pants.png';
import mockImg3 from '@/assets/images/home/mock-3-shoes.png';
import mockImg4 from '@/assets/images/home/mock-4-bag.png';
import mockImg5 from '@/assets/images/home/mock-5-cap.png';
import mockImg6 from '@/assets/images/home/mock-6-hoodie.png';
import AddItemModal from '@/components/AddItemModal';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useWishes } from '@/hooks/useWishes';
import { DUMMY_POSITIONS, isDummyProduct } from '@/mocks/dummyWishes';
import { dummyProducts } from '@/mocks/products';

const DUMMY_IMAGES = [mockImg1, mockImg2, mockImg3, mockImg4, mockImg5, mockImg6];

// 카드 크기 80.319px 기준, 각 이미지 패딩을 % 로 변환
const DUMMY_CARD_PADDING = [
  { top: 22.45, right: 18.46, bottom: 17.79, left: 16.8 }, // tshirt
  { top: 11.87, right: 22.72, bottom: 11.87, left: 22.72 }, // pants
  { top: 22.72, right: 12.9, bottom: 22.72, left: 12.41 }, // shoes
  { top: 15.2, right: 19.85, bottom: 15.19, left: 19.85 }, // bag
  { top: 19.81, right: 17.68, bottom: 20.44, left: 17.68 }, // cap
  { top: 14.52, right: 21.75, bottom: 14.52, left: 20.98 }, // hoodie
];

// 카드 내 번호 위치 (카드 기준 %)
const DUMMY_NUMBER_POSITIONS = [
  { x: 50, y: 45 }, // tshirt
  { x: 50, y: 26 }, // pants
  { x: 65, y: 57 }, // shoes
  { x: 50, y: 67 }, // bag
  { x: 50, y: 50 }, // cap
  { x: 50, y: 50 }, // hoodie
];

// 피그마 측정값 기준 (basket 402×524px 좌표계, 카드 72px, center %)
// 좌열 left=111.31, 우열 left=218.69 / row1 top=78.86, row4 bottom margin=85.17
const FILLED_POSITIONS = [
  { top: 21.9, left: 33.7 }, // card 1 — row1 left
  { top: 21.9, left: 63.4 }, // card 2 — row1 right
  { top: 40.3, left: 33.7 }, // card 3 — row2 left
  { top: 40.3, left: 63.4 }, // card 4 — row2 right
  { top: 58.6, left: 33.7 }, // card 5 — row3 left
  { top: 58.6, left: 63.4 }, // card 6 — row3 right
  { top: 76.9, left: 33.7 }, // card 7 — row4 left
  { top: 76.9, left: 63.4 }, // card 8 — row4 right
];

// 친구 참여 이모지 인디케이터 위치 (basket container 기준 %, 피그마 실측)
// emoji-1: left=292, right=46(362px기준), bottom=350
// emoji-2: left=139.69, right=238.31 (402px기준), y추정
// emoji-3: left=288.69, right=89.31, bottom=138.6 (402px기준)
const FRIEND_EMOJI_POSITIONS = [
  { top: 34.1, left: 72.4 }, // row1-2 사이 우열 우상단
  { top: 52.5, left: 42.7 }, // row2-3 사이 좌열 우상단
  { top: 71.1, left: 72.4 }, // row3-4 사이 우열 우상단
];

function HomePage() {
  useThemeColor('#FFFFFF');
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const wishesQuery = useWishes();

  const isLoading = wishesQuery.isLoading;
  const wishes = wishesQuery.data ?? [];
  const realWishes = wishes.filter(wish => !isDummyProduct(wish));
  const isFilledState = realWishes.length >= 1;
  const canStartTournament = isFilledState;

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
    <main className="relative flex h-full w-full flex-col pt-[calc(env(safe-area-inset-top)+24px)]">
      <header className="px-6 text-center">
        {isLoading ? (
          <>
            <h1 className="text-[24px] leading-8 font-bold tracking-[-0.6px] text-[#171719]">
              상품 불러오는 중
            </h1>
            <p className="mt-2 text-lg leading-6.5 font-medium tracking-[-0.6px] text-[#ADB1BB]">
              가격 확인 완료...
            </p>
          </>
        ) : isFilledState ? (
          <>
            <h1 className="text-[24px] leading-8 font-bold tracking-[-0.6px] text-[#171719]">
              총 <span className="text-[#1F7AF9]">8</span>개의 상품이 모였어요!
            </h1>
            <p className="mt-2 text-lg leading-6.5 font-medium tracking-[-0.6px] text-[#ADB1BB]">
              이제 하나씩 골라볼까요?
            </p>
          </>
        ) : (
          <>
            <h1 className="text-[24px] leading-[32px] font-bold tracking-[-0.6px] text-[#171719]">
              고민 중인 위시템을 모아볼까요?
            </h1>
            <p className="mt-2 text-lg leading-6.5 font-medium tracking-[-0.6px] text-[#ADB1BB]">
              혼자 담아도 좋고, 같이 채우면 더 재밌어요
            </p>
          </>
        )}
      </header>

      <section className="relative flex flex-1 items-center justify-center">
        {isLoading ? (
          <div className="flex h-[280px] w-[280px] animate-pulse rounded-2xl bg-[#E8E9EC]" />
        ) : null}
        <div
          className={`@container relative aspect-[56/73] h-full max-h-[524px] w-full max-w-[402px] ${isLoading ? 'hidden' : ''}`}
        >
          <Image
            src="/images/home-empty-basket-gray.png"
            alt="장바구니"
            fill
            sizes="(max-width: 480px) calc(100vw - 40px), 402px"
            priority
            className="object-contain"
          />

          {isFilledState ? (
            <>
              {FILLED_POSITIONS.map((position, i) => (
                <FilledProductCard
                  key={i}
                  imagePath={dummyProducts[i % dummyProducts.length]!.imagePath}
                  top={position.top}
                  left={position.left}
                />
              ))}
              {FRIEND_EMOJI_POSITIONS.map((pos, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                  style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                >
                  <FriendEmojiIcon />
                </div>
              ))}
            </>
          ) : (
            <>
              {DUMMY_POSITIONS.map((position, i) => (
                <DummyEmojiCard
                  key={i}
                  imageSrc={DUMMY_IMAGES[i % DUMMY_IMAGES.length]!}
                  padding={DUMMY_CARD_PADDING[i % DUMMY_CARD_PADDING.length]!}
                  numberPos={DUMMY_NUMBER_POSITIONS[i % DUMMY_NUMBER_POSITIONS.length]!}
                  index={i}
                  top={position.top}
                  left={position.left}
                />
              ))}
            </>
          )}

          {!isFilledState && <CenterAddButton onClick={handleOpenSheet} />}
        </div>
      </section>

      <div className="px-5 pt-[10.4px] pb-[calc(env(safe-area-inset-bottom)+34px)]">
        <button
          type="button"
          disabled={!canStartTournament}
          onClick={handleStartTournament}
          className="flex h-13.5 w-full shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#191B1F] px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-white disabled:bg-[#C5C8CE] disabled:text-white"
        >
          {canStartTournament ? '토너먼트 시작하기' : '2개부터 시작 가능'}
        </button>
      </div>

      <AddItemModal open={isSheetOpen} onClose={handleCloseSheet} />
    </main>
  );
}

type FilledProductCardProps = {
  imagePath: string;
  top: number;
  left: number;
};

function FilledProductCard({ imagePath, top, left }: FilledProductCardProps) {
  return (
    <div
      className="absolute aspect-square w-[17.9%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[15.672px] border-[2.939px] border-white bg-[#F4F4F6] shadow-[0_0_7.836px_0_rgba(0,0,0,0.16)]"
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      <Image
        src={imagePath}
        alt=""
        fill
        sizes="(max-width: 480px) 20vw, 80px"
        className="object-cover"
      />
    </div>
  );
}

type PaddingT = { top: number; right: number; bottom: number; left: number };

type DummyEmojiCardProps = {
  imageSrc: Parameters<typeof Image>[0]['src'];
  padding: PaddingT;
  numberPos: { x: number; y: number };
  index: number;
  top: number;
  left: number;
};

function DummyEmojiCard({ imageSrc, padding, numberPos, index, top, left }: DummyEmojiCardProps) {
  return (
    <div
      className="absolute aspect-square w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-[15.672px] border-[2.939px] border-white bg-[#F4F4F6] shadow-[0_0_7.836px_0_rgba(0,0,0,0.16)]"
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      <div
        className="absolute"
        style={{
          top: `${padding.top}%`,
          right: `${padding.right}%`,
          bottom: `${padding.bottom}%`,
          left: `${padding.left}%`,
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 480px) 20vw, 80px"
          className="object-contain"
        />
      </div>
      <span
        className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-black"
        style={{
          top: `${numberPos.y}%`,
          left: `${numberPos.x}%`,
          fontFamily: '"Carmen Sans", sans-serif',
          fontSize: '10.775px',
          fontWeight: 700,
          lineHeight: '100%',
          letterSpacing: '-0.323px',
        }}
      >
        ({index + 1})
      </span>
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
      className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#191B1F] bg-[#191B1F] p-3.5"
      style={{ width: '61.6px', height: '61.6px' }}
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

function FriendEmojiIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 18C8.56057 18 6.67593 16.1447 6.14946 14.0324C6.01172 13.4798 6.47543 13 7.04495 13H16.9551C17.5246 13 17.9883 13.4798 17.8506 14.0324C17.3242 16.1447 15.4395 18 12 18ZM9 9C9 9.55228 8.55228 10 8 10C7.44772 10 7 9.55228 7 9C7 8.44772 7.44772 8 8 8C8.55228 8 9 8.44772 9 9ZM16 10C16.5523 10 17 9.55228 17 9C17 8.44772 16.5523 8 16 8C15.4477 8 15 8.44772 15 9C15 9.55228 15.4477 10 16 10Z"
        fill="#1F7AF9"
      />
    </svg>
  );
}

export default HomePage;
