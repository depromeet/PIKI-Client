'use client';

import type { Product } from '@/types/tournament';
import { useCardSelectionAnimation } from '@/hooks/useCardSelectionAnimation';

import ProductCard from './ProductCard';

const HANGER_HEIGHT = 54;
const HOOK_HEIGHT = 33;
const IMAGE_HEIGHT = 320;
const HORIZONTAL_LINE_WIDTH = 350;

type VsSectionProps = {
  left: Product;
  right: Product;
  onSelect: (winner: Product) => void;
};

export default function VsSection({ left, right, onSelect }: VsSectionProps) {
  const {
    handleClick,
    selectedSide,
    animationDuration,
    hangerRotate,
    leftCardShift,
    rightCardShift,
    leftCardStyle,
    rightCardStyle,
  } = useCardSelectionAnimation(onSelect);

  const transition = `transition-all ease-in-out`;
  const duration = { transitionDuration: `${animationDuration}ms` };

  return (
    <div className="w-full">
      {/* 헹거 영역 */}
      <div className="relative" style={{ height: HANGER_HEIGHT }}>
        <div className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 border-l-2 border-dashed border-gray-300" />
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 border-t border-dashed border-gray-300 ${transition}`}
          style={{ width: HORIZONTAL_LINE_WIDTH, transform: `rotate(${hangerRotate}deg)`, ...duration }}
        />
      </div>

      {/* 카드 영역 */}
      <div className="relative flex gap-3 px-4">
        {/* 왼쪽 */}
        <div
          className={`flex flex-1 flex-col items-center ${transition}`}
          style={{
            transform: `translateY(${leftCardShift}px) scale(${leftCardStyle.scale})`,
            filter: `blur(${leftCardStyle.blur}px)`,
            ...duration,
          }}
        >
          <div className="border-l-2 border-dashed border-gray-300" style={{ height: HOOK_HEIGHT }} />
          <ProductCard
            {...left}
            isPicked={selectedSide === 'left'}
            onClick={() => handleClick('left', left)}
          />
        </div>

        {/* 오른쪽 */}
        <div
          className={`flex flex-1 flex-col items-center ${transition}`}
          style={{
            transform: `translateY(${rightCardShift}px) scale(${rightCardStyle.scale})`,
            filter: `blur(${rightCardStyle.blur}px)`,
            ...duration,
          }}
        >
          <div className="w-0 border-l-2 border-dashed border-gray-300" style={{ height: HOOK_HEIGHT }} />
          <ProductCard
            {...right}
            isPicked={selectedSide === 'right'}
            onClick={() => handleClick('right', right)}
          />
        </div>

        {/* VS 뱃지 */}
        <div
          className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#454545] px-3 py-3 text-base font-bold text-white"
          style={{ top: HOOK_HEIGHT + IMAGE_HEIGHT / 2 }}
        >
          VS
        </div>
      </div>
    </div>
  );
}
