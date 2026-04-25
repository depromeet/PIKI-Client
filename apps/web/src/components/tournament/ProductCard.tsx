import Image from 'next/image';

import type { Product } from '@/types/tournament';

type ProductCardProps = Product & {
  onClick?: () => void;
  isPicked?: boolean;
};

export default function ProductCard({
  image,
  name,
  price,
  reason,
  onClick,
  isPicked,
}: ProductCardProps) {
  return (
    <div className="relative w-[170px] cursor-pointer" onClick={onClick}>
      {isPicked && (
        <div className="absolute top-0 left-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#47484C] shadow-lg">
          <span className="text-base font-bold text-white" style={{ transform: 'rotate(-15deg)' }}>
            Pick!
          </span>
        </div>
      )}
      <div className="flex h-[300px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <div className="relative flex h-[160px] shrink-0 items-center justify-center bg-gray-100 p-4">
          <Image
            src={image}
            alt={name}
            fill
            sizes="170px"
            priority
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
          <p className="line-clamp-2 text-xl font-bold">{name}</p>
          <p className="mt-1 text-base font-medium text-gray-600">{price.toLocaleString()}원</p>
          <p className="mt-2.5 line-clamp-1 text-xs text-gray-400">{reason}</p>
        </div>
      </div>
    </div>
  );
}
