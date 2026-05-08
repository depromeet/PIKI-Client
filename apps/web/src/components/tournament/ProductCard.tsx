import Image from 'next/image';

import type { ProductT } from '@/types/product';

type ProductCardProps = ProductT & {
  onClick?: () => void;
  isPicked?: boolean;
};

export default function ProductCard({
  imagePath,
  name,
  price,
  onClick,
  isPicked,
}: ProductCardProps) {
  return (
    <div className="relative w-[148px] cursor-pointer" onClick={onClick}>
      {isPicked && (
        <div className="absolute top-0 left-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F7AF9] shadow-lg">
          <span className="text-base font-bold text-white" style={{ transform: 'rotate(-15deg)' }}>
            Pick!
          </span>
        </div>
      )}
      <div className="flex w-[148px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_8px_0_rgba(0,0,0,0.10)]">
        <div className="relative h-[123px] w-[148px] shrink-0 bg-gray-100">
          <Image
            src={imagePath}
            alt={name}
            fill
            sizes="(max-width: 480px) 45vw, 200px"
            priority
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-[8px] p-4 text-center">
          <p className="text-[14px] leading-[20px] font-medium tracking-[-0.6px] text-[#686F7E]">
            {name}
          </p>
          <p className="text-[16px] leading-[22px] font-bold tracking-[-0.6px] text-[#2D3037]">
            {price.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
}
