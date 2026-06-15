import { Kode_Mono } from 'next/font/google';
import Image from 'next/image';
import { forwardRef } from 'react';

import PikiReceiptLogo from '@/assets/images/piki-receipt-logo.svg';
import ReceiptZigzag from '@/assets/images/tournament/result/receipt-zigzag.svg';
import TrophyBadge from '@/assets/images/tournament/result/trophy-badge.svg';
import { cn } from '@/utils/cn';

import type { RankedProductT } from '../../_common/_types/tournament';
import { formatDate, formatPrice, formatTime } from '../_utils/formatReceipt';

const kodeMono = Kode_Mono({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

type ReceiptPaperProps = {
  tournamentName: string;
  result: RankedProductT[];
  date: Date;
};

const SectionDivider = () => <div className="h-px w-full border-t border-dashed border-gray-100" />;

/**
 * 영수증 구분선 라벨. `*****Label*****` 형태로, 라벨 길이에 상관없이 항상
 * 영수증 전체 폭을 채우도록 양옆 별표가 가용 공간만큼 자동으로 늘어난다.
 */
const PlaceLabel = ({ label }: { label: string }) => (
  <div
    className={cn(kodeMono.className, 'flex items-center gap-1 px-5 text-text-neutral-secondary')}
  >
    <span aria-hidden className="flex-1 overflow-hidden text-[10px] leading-4.5 whitespace-nowrap">
      {'*'.repeat(60)}
    </span>
    <span className="shrink-0 text-[12px] leading-4.5 tracking-[-0.4px]">{label}</span>
    <span
      aria-hidden
      className="flex-1 overflow-hidden text-end text-[10px] leading-4.5 whitespace-nowrap"
    >
      {'*'.repeat(60)}
    </span>
  </div>
);

const ReceiptPaper = forwardRef<HTMLDivElement, ReceiptPaperProps>(function ReceiptPaper(
  { tournamentName, result, date },
  ref
) {
  const [first, ...rest] = result;

  return (
    <div
      ref={ref}
      className="relative flex w-full flex-col gap-2 bg-bg-layer-default pt-6 pb-6.25 filter-[drop-shadow(0px_2px_4px_rgba(0,0,0,0.12))]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 h-15.25 w-full bg-linear-to-t from-white to-[#f9f9f9]"
      />

      {/* PIKI 로고 + 헤드라인 */}
      <div className="relative flex flex-col items-center gap-2">
        <PikiReceiptLogo aria-label="PIKI" className="h-14 w-19.25" />
        <p
          className={cn(
            kodeMono.className,
            'text-center text-[12px] leading-4 font-semibold tracking-[-0.4px] text-text-neutral-secondary'
          )}
        >
          FROM WISH TO PICK
        </p>
      </div>

      <div className="flex flex-col">
        {/* 날짜 / 시간 */}
        <div className={cn(kodeMono.className, 'flex items-center justify-between px-5')}>
          <span className="caption-1-semibold text-text-neutral-secondary">{formatDate(date)}</span>
          <span className="caption-1-semibold text-text-neutral-secondary">{formatTime(date)}</span>
        </div>

        <SectionDivider />

        {/* 토너먼트 이름 */}
        <div className="flex flex-col px-5 py-2">
          <p className="body-2-semibold text-text-neutral-primary">{tournamentName}</p>
        </div>

        {/* 1st Place */}
        {first && (
          <div className="flex flex-col gap-3 py-3">
            <PlaceLabel label="1st Place" />
            <ProductCard product={first} index={1} highlight />
          </div>
        )}

        {/* Others */}
        {rest.length > 0 && (
          <div className="flex flex-col gap-3 py-3">
            <PlaceLabel label="Others" />
            <ul className="flex flex-col gap-3">
              {rest.map((product, idx) => (
                <li key={`${idx + 2}-${product.name}`}>
                  <ProductCard product={product} index={idx + 2} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <SectionDivider />

        {/* @piki.day */}
        <p
          className={cn(
            kodeMono.className,
            'px-5 pt-3 pb-2 text-center caption-1-semibold text-text-neutral-secondary'
          )}
        >
          @piki.day
        </p>
      </div>

      {/* 영수증 하단 톱니 */}
      <ReceiptZigzag
        aria-hidden
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-full left-0 block h-4.5 w-full"
      />
    </div>
  );
});

type ProductCardProps = {
  product: RankedProductT;
  index: number;
  /** 1위 카드에 트로피 뱃지 표시 */
  highlight?: boolean;
};

function ProductCard({ product, index, highlight = false }: ProductCardProps) {
  return (
    <div className="flex items-center gap-3 px-5">
      <div className="relative size-15 shrink-0">
        <div className="size-full overflow-hidden rounded-md bg-gray-50">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={60}
              height={60}
              className="size-full object-cover"
              unoptimized
            />
          )}
        </div>
        {highlight && (
          <TrophyBadge
            aria-label="1위"
            className="pointer-events-none absolute -top-2 -left-2 size-8"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="body-2-regular break-keep text-text-neutral-primary">{product.name}</p>
        <p className="body-2-semibold text-text-neutral-primary">{formatPrice(product.price)}</p>
      </div>
      <span className="sr-only">{index}위</span>
    </div>
  );
}

export default ReceiptPaper;
