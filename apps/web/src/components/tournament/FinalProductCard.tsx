import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

import type { ProductT } from '@/types/product';

const renderIcon = (icon: ReactNode) => {
  const raw = icon as unknown;
  if (raw !== null && typeof raw === 'object' && !Array.isArray(raw) && 'src' in raw) {
    return <Image src={raw as StaticImageData} alt="" width={12} height={12} />;
  }
  return <>{icon}</>;
};

type FinalProductCardProps = ProductT & {
  onClick?: () => void;
  isPicked?: boolean;
};

export default function FinalProductCard({
  imagePath,
  name,
  price,
  tags,
  onClick,
  isPicked,
}: FinalProductCardProps) {
  return (
    <div
      className={`relative cursor-pointer transition-all duration-[800ms] ease-in-out ${isPicked ? 'w-[178px]' : 'w-[148px]'}`}
      onClick={onClick}
    >
      {isPicked && (
        <div className="absolute top-0 left-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F7AF9] shadow-lg">
          <span className="text-base font-bold text-white" style={{ transform: 'rotate(-15deg)' }}>
            Pick!
          </span>
        </div>
      )}
      <div
        className={`flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-[800ms] ease-in-out ${isPicked ? 'w-[178px]' : 'w-[148px]'}`}
      >
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
        <div className="flex flex-col gap-[8px] p-4 text-center">
          <p className="text-[14px] leading-[20px] font-medium tracking-[-0.6px] text-[#686F7E]">
            {name}
          </p>
          <p className="text-[16px] leading-[22px] font-bold tracking-[-0.6px] text-[#2D3037]">
            {price.toLocaleString()}원
          </p>
        </div>
        {tags && tags.length > 0 && (
          <>
            <div className="mx-4 border-t border-dashed border-[#E0E0E0]" />
            <div className="flex flex-col gap-[6px] p-4">
              {tags.map(tag => (
                <div
                  key={tag.name}
                  className="flex items-center justify-center gap-[6px] rounded-[6px] px-[8px] py-[5px]"
                  style={{ backgroundColor: tag.backgroundColor }}
                >
                  <span style={{ color: tag.iconColor }}>{renderIcon(tag.icon)}</span>
                  <span
                    className="text-[12px] leading-[16px] font-semibold"
                    style={{ color: tag.textColor }}
                  >
                    {tag.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
