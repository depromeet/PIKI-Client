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
    <div className="relative w-full cursor-pointer" onClick={onClick}>
      {isPicked && (
        <div className="absolute top-0 left-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#47484C] shadow-lg">
          <span className="text-base font-bold text-white" style={{ transform: 'rotate(-15deg)' }}>
            Pick!
          </span>
        </div>
      )}
      <div className="flex h-[300px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <div className="relative h-40 w-full shrink-0 bg-gray-100">
          <Image
            src={imagePath}
            alt={name}
            fill
            sizes="(max-width: 480px) 45vw, 200px"
            priority
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
          <p className="line-clamp-2 text-xl font-bold">{name}</p>
          <p className="mt-1 text-base font-medium text-gray-600">{price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
}
