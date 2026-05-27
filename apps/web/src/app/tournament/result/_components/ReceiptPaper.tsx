import { Kode_Mono } from 'next/font/google';
import Image from 'next/image';
import { forwardRef } from 'react';

import { ImageIconOutline, LinkIconFill } from '@/assets/icons';
import PikiReceiptLogo from '@/assets/images/piki-receipt-logo.svg';
import ReceiptZigzag from '@/assets/images/tournament/result/receipt-zigzag.svg';
import { cn } from '@/utils/cn';

import type { RankedProductT } from '../../_types/tournament';

const kodeMono = Kode_Mono({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

type ReceiptPaperProps = {
  tournamentName: string;
  result: RankedProductT[];
  date: Date;
};

const formatDate = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const formatTime = (date: Date) => {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
};

const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;

const SectionDivider = () => <div className="h-px w-full border-t border-dashed border-gray-100" />;

const PlaceLabel = ({ label }: { label: string }) => (
  <p className="text-center text-text-neutral-secondary">
    <span className="text-[10px] leading-[18px] tracking-[-0.4px]">******************</span>
    <span className="text-[12px] leading-[18px] tracking-[-0.4px]">{label}</span>
    <span className="text-[10px] leading-[18px] tracking-[-0.4px]">******************</span>
  </p>
);

const ReceiptPaper = forwardRef<HTMLDivElement, ReceiptPaperProps>(function ReceiptPaper(
  { tournamentName, result, date },
  ref
) {
  const [first, second, third, fourth] = result;

  return (
    <div
      ref={ref}
      className={cn(
        kodeMono.className,
        'relative flex w-74.75 flex-col gap-2 bg-bg-layer-default pt-6 pb-6.25 filter-[drop-shadow(0px_2px_4px_rgba(0,0,0,0.12))]'
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 h-15.25 w-full bg-linear-to-t from-white to-[#f9f9f9]"
      />

      {/* PIKI 로고 + 헤드라인 */}
      <div className="relative flex flex-col items-center gap-4">
        <PikiReceiptLogo aria-label="PIKI" className="h-14 w-19.25" />
        <p className="text-center text-[12px] leading-[16px] font-semibold tracking-[-0.4px] text-text-neutral-secondary">
          FROM ENDLESS WISHLISTS,
          <br />
          TO TODAY&apos;S ONE PICK.
        </p>
      </div>

      <div className="flex flex-col">
        {/* 날짜 / 시간 */}
        <div className="flex items-center justify-between px-5">
          <span className="text-[12px] leading-[18px] font-semibold tracking-[-0.4px] text-text-neutral-secondary">
            {formatDate(date)}
          </span>
          <span className="text-[12px] leading-[18px] font-semibold tracking-[-0.4px] text-text-neutral-secondary">
            {formatTime(date)}
          </span>
        </div>

        <SectionDivider />

        {/* 토너먼트 이름 */}
        <div className="flex flex-col px-5 py-2">
          <p className="text-[12px] leading-[18px] font-semibold tracking-[-0.4px] text-text-neutral-secondary">
            Tournament name
          </p>
          <p className="text-[12px] leading-[18px] font-semibold tracking-[-0.4px] text-text-neutral-secondary">
            {tournamentName}
          </p>
        </div>

        <SectionDivider />

        {/* 토너먼트 결과 라벨 */}
        <div className="flex items-center justify-center px-5 py-2">
          <p className="text-[12px] leading-[18px] font-semibold tracking-[-0.4px] text-text-neutral-secondary">
            Tournament Results
          </p>
        </div>

        <SectionDivider />

        {/* 1st Place */}
        {first && (
          <div className="flex flex-col gap-3 py-3">
            <PlaceLabel label="1st Place" />
            <RankedRowLarge product={first} index={1} />
          </div>
        )}

        {/* 2nd Place */}
        {second && (
          <div className="flex flex-col gap-3 py-3">
            <PlaceLabel label="2nd Place" />
            <RankedRowLarge product={second} index={2} />
          </div>
        )}

        {/* 3rd & 4th */}
        {(third || fourth) && (
          <div className="flex flex-col gap-4 py-3">
            <PlaceLabel label="3rd & 4th" />
            {third && <RankedRowSmall product={third} index={3} />}
            {fourth && <RankedRowSmall product={fourth} index={4} />}
          </div>
        )}

        <SectionDivider />

        {/* Have a nice pick */}
        <p className="px-5 py-2 text-center text-[12px] leading-[18px] font-semibold tracking-[-0.4px] text-text-neutral-secondary">
          *Have a nice pick*
          <br />
          @piki.day
        </p>

        <SectionDivider />
      </div>

      {/* 공유 액션 */}
      <div className="flex items-center justify-center gap-5 py-2">
        <ShareAction icon={<ImageIconOutline className="size-3.5" />} label="이미지 공유" />
        <ShareAction icon={<LinkIconFill className="size-[18px]" />} label="플레이 링크 공유" />
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

type RankedRowProps = {
  product: RankedProductT;
  index: number;
};

function RankedRowLarge({ product, index }: RankedRowProps) {
  const orderStr = String(index).padStart(2, '0');
  return (
    <div className="flex items-center justify-center gap-[15px] px-5">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-black/5">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="flex w-32 flex-col gap-1 tracking-[-0.6px]">
        <p className="text-[14px] leading-5 text-text-neutral-primary">
          {orderStr}.
          <br />
          {product.name}
        </p>
        <p className="text-[14px] leading-[22px] font-bold text-text-neutral-primary">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}

function RankedRowSmall({ product, index }: RankedRowProps) {
  const orderStr = String(index).padStart(2, '0');
  return (
    <div className="flex items-start justify-between px-5">
      <div className="flex items-start gap-1">
        <p className="text-[14px] leading-5 text-text-neutral-primary">{orderStr}.</p>
        <p className="w-[138px] text-[14px] leading-5 tracking-[-0.6px] text-text-neutral-primary">
          {product.name}
        </p>
      </div>
      <p className="text-[14px] leading-[22px] font-bold tracking-[-0.6px] text-text-neutral-primary">
        {formatPrice(product.price)}
      </p>
    </div>
  );
}

type ShareActionProps = {
  icon: React.ReactNode;
  label: string;
};

function ShareAction({ icon, label }: ShareActionProps) {
  return (
    <button type="button" className="flex items-center gap-2">
      <span className="flex size-[34px] items-center justify-center rounded-full border border-border-neutral-muted text-icon-neutral-primary">
        {icon}
      </span>
      <span className="text-[12px] leading-[18px] tracking-[-0.4px] text-text-neutral-primary">
        {label}
      </span>
    </button>
  );
}

export default ReceiptPaper;
