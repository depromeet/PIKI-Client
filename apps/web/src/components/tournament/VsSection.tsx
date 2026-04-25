import { Product } from '@/types/tournament';

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
  return (
    <div className="w-full">
      {/* 헹거 영역 */}
      <div className="relative" style={{ height: HANGER_HEIGHT }}>
        <div className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 border-l-2 border-dashed border-gray-300" />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 border-t border-dashed border-gray-300"
          style={{ width: HORIZONTAL_LINE_WIDTH }}
        />
      </div>

      {/* 카드 영역 */}
      <div className="relative flex gap-3 px-4">
        <div className="flex flex-1 flex-col items-center">
          <div className="border-l-2 border-dashed border-gray-300" style={{ height: HOOK_HEIGHT }} />
          <ProductCard {...left} onClick={() => onSelect(left)} />
        </div>

        <div className="flex flex-1 flex-col items-center">
          <div className="w-0 border-l-2 border-dashed border-gray-300" style={{ height: HOOK_HEIGHT }} />
          <ProductCard {...right} onClick={() => onSelect(right)} />
        </div>

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
