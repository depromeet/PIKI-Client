import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

import type { ProductT } from '../types/tournamentTypes';

const renderIcon = (icon: ReactNode) => {
  const raw = icon as unknown;
  if (raw !== null && typeof raw === 'object' && !Array.isArray(raw) && 'src' in raw) {
    return <Image src={raw as StaticImageData} alt="" width={12} height={12} />;
  }
  return <>{icon}</>;
};

type FinalProductCardProps = ProductT & {
  isPicked?: boolean;
  onClick?: () => void;
};

function FinalProductCard({
  imageUrl,
  name,
  price,
  tags,
  isPicked,
  onClick,
}: FinalProductCardProps) {
  return (
    <button type="button" onClick={onClick} className="relative w-[148px] text-left">
      {isPicked && (
        <div className="absolute top-0 left-1/2 z-10 flex size-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-500 shadow-lg">
          <span className="body-1-bold -rotate-12 text-white">Pick!</span>
        </div>
      )}
      <div className="flex w-[148px] flex-col overflow-hidden rounded-2xl bg-bg-layer-default shadow-[0_1px_8px_0_rgba(0,0,0,0.10)]">
        <div className="relative h-[123px] w-[148px] shrink-0 bg-gray-50">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 480px) 45vw, 200px"
            priority
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 p-4 text-center">
          <p className="body-2-medium text-text-neutral-secondary">{name}</p>
          <p className="body-1-bold text-text-neutral-primary">{price.toLocaleString()}원</p>
        </div>
        {tags && tags.length > 0 && (
          <>
            <div className="mx-4 border-t border-dashed border-gray-100" />
            <div className="flex flex-col gap-1.5 p-4">
              {tags.map(tag => (
                <div
                  key={tag.name}
                  className="flex items-center justify-center gap-1.5 rounded-md px-2 py-[5px]"
                  style={{ backgroundColor: tag.backgroundColor }}
                >
                  <span style={{ color: tag.iconColor }}>{renderIcon(tag.icon)}</span>
                  <span className="caption-1-semibold" style={{ color: tag.textColor }}>
                    {tag.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </button>
  );
}

export default FinalProductCard;
