'use client';

import { gsap } from 'gsap';
import { Geist_Mono, Poppins } from 'next/font/google';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';

import ReceiptPrinterImg from '@/assets/images/tournament/result/receipt-printer.png';
import type { RankedProductT } from '@/types/product';
import { cn } from '@/utils/cn';

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });
const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['600'] });

function RankBadge({ rank }: { rank: number }) {
  return (
    <div className="absolute -right-3 -bottom-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23.568"
        height="23.568"
        viewBox="0 0 24 24"
        fill="none"
        className="block"
      >
        <circle
          cx="11.7842"
          cy="11.7842"
          r="10.7842"
          fill="#A2DEFF"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontFamily: '"Carmen Sans", sans-serif',
          fontSize: '10.775px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '100%',
          letterSpacing: '-0.323px',
          color: '#000',
        }}
      >
        {rank}
      </span>
    </div>
  );
}

const renderIcon = (icon: ReactNode) => {
  const raw = icon as unknown;
  if (raw !== null && typeof raw === 'object' && !Array.isArray(raw) && 'src' in raw) {
    return <Image src={raw as StaticImageData} alt="" width={12} height={12} />;
  }
  return <>{icon}</>;
};

const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;

const formatReceiptDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${month}-${year} 00:00:00`;
};

type Props = {
  result: RankedProductT[];
};

export default function ReceiptDrawMachine({ result }: Props) {
  const animationScopeRef = useRef<HTMLDivElement | null>(null);
  const receiptPaperRef = useRef<HTMLDivElement | null>(null);
  const slotBarRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const animationScopeElement = animationScopeRef.current;
    const receiptPaperElement = receiptPaperRef.current;
    const slotBarElement = slotBarRef.current;

    if (!animationScopeElement || !receiptPaperElement || !slotBarElement) return;

    const context = gsap.context(() => {
      const receiptHeight = receiptPaperElement.getBoundingClientRect().height;
      const startY = receiptHeight;

      gsap.set(slotBarElement, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        transformOrigin: 'center center',
      });
      gsap.set(receiptPaperElement, {
        x: 0,
        y: -startY,
        rotation: 0,
        skewX: 0,
        skewY: 0,
        transformOrigin: '50% 0%',
      });

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' }, repeat: 0 });

      timeline
        .to(slotBarElement, {
          duration: 0.18,
          scaleX: 1,
          scaleY: 1.1,
          transformOrigin: 'center center',
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 2,
        })
        .to(
          receiptPaperElement,
          { duration: 1.45, x: 0, y: 0, rotation: 0, ease: 'power3.out' },
          '-=0.08'
        )
        .to(
          slotBarElement,
          {
            duration: 0.22,
            scaleX: 1,
            scaleY: 1,
            transformOrigin: 'center center',
            ease: 'power1.out',
          },
          '<0.35'
        )
        .set(receiptPaperElement, {
          x: 0,
          y: 0,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          skewX: 0,
          skewY: 0,
        })
        .set(slotBarElement, { x: 0, y: 0, scaleX: 1, scaleY: 1 });
    }, animationScopeElement);

    return () => context.revert();
  }, []);

  return (
    <div className="relative isolate flex min-h-0 w-full flex-1 flex-col" ref={animationScopeRef}>
      <div className="relative z-30 w-full shrink-0" style={{ aspectRatio: '267/62' }}>
        <Image
          src={ReceiptPrinterImg}
          alt="영수증 기계"
          className="h-full w-full object-contain"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-[5px]" ref={slotBarRef} />
      </div>
      <div className="invisible -mt-8 min-h-0 flex-1 shrink-0" aria-hidden />

      <div className="pointer-events-none absolute inset-x-0 top-[53px] bottom-0 z-40 flex justify-center overflow-hidden">
        <div
          ref={receiptPaperRef}
          className="pointer-events-auto flex h-full min-h-0 shrink-0 flex-col drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)] will-change-transform"
          style={{ width: '299px' }}
        >
          <div className="flex min-h-0 flex-1 flex-col">
            <div
              className="relative scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-y-contain mask-[linear-gradient(to_bottom,black_0%,black_calc(100%-2px),transparent_100%)]"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to bottom, black 0%, black calc(100% - 2px), transparent 100%)',
              }}
            >
              {/* MY PICK! 헤더 */}
              <div className="flex flex-col items-start gap-5 bg-white pt-5 pb-[25px]">
                <p
                  className={cn(
                    poppins.className,
                    'w-full text-center text-[48px] leading-[100%] font-bold tracking-[-0.96px] text-black uppercase'
                  )}
                >
                  MY PICK!
                </p>
                <div className="mx-5 self-stretch border-t border-dashed border-[#DCDEE2]" />
                <div
                  className={cn(
                    geistMono.className,
                    'flex w-full flex-col px-[25px] text-[12px] leading-[18px] font-semibold tracking-[-0.4px] text-[#2D3037]'
                  )}
                >
                  <div className="flex gap-[37px]">
                    <span className="w-[69px] shrink-0">Date :</span>
                    <span>{formatReceiptDate(new Date())}</span>
                  </div>
                  <div className="flex gap-[37px]">
                    <span className="w-[69px] shrink-0">Terminal:</span>
                    <span>Picky</span>
                  </div>
                  <div className="flex gap-[37px]">
                    <span className="w-[69px] shrink-0">Served by:</span>
                    <span>piki.day</span>
                  </div>
                </div>
              </div>

              {/* 상품 섹션 */}
              <div className="flex flex-col bg-white">
                {/* 1위 */}
                <section className="flex flex-col">
                  <p className="px-[25px] text-center text-[14px] leading-[18px] font-semibold tracking-[-0.4px] text-[#2D3037]">
                    ****** 1위 - 지금 사도 후회 없을 선택 ******
                  </p>
                  <div className="mt-[12px] flex items-start gap-[21px] pr-[45px] pl-[25px]">
                    <div className="relative shrink-0">
                      <div className="h-20 w-20 overflow-hidden rounded-xl border border-[#DCDEE2] bg-black/5">
                        <Image
                          src={result[0]!.imagePath}
                          width={80}
                          height={80}
                          alt={result[0]!.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <RankBadge rank={1} />
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      <p className="text-[14px] leading-5 font-medium tracking-[-0.6px] text-[#686F7E]">
                        {result[0]!.name}
                      </p>
                      <p className="text-[16px] leading-[22px] font-bold tracking-[-0.6px] text-[#2D3037]">
                        {formatPrice(result[0]!.price)}
                      </p>
                      {!!result[0]!.tags?.length && (
                        <div className="mt-1 flex flex-col gap-[6px]">
                          {result[0]!.tags.map(tag => (
                            <div
                              key={tag.name}
                              className="inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1"
                              style={{ backgroundColor: tag.backgroundColor }}
                            >
                              <span style={{ color: tag.iconColor }}>{renderIcon(tag.icon)}</span>
                              <span
                                className="text-center text-[12px] leading-[18px] font-semibold tracking-[-0.4px]"
                                style={{ color: tag.textColor }}
                              >
                                {tag.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* 2위 */}
                <section className="mt-8 flex flex-col">
                  <p className="px-[25px] text-center text-[14px] leading-[18px] font-semibold tracking-[-0.4px] text-[#2D3037]">
                    ****** 2위 - 끝까지 고민했던 선택 ******
                  </p>
                  <div className="mt-[18px] flex items-start gap-[21px] pr-[45px] pl-[25px]">
                    <div className="relative shrink-0">
                      <div className="h-20 w-20 overflow-hidden rounded-xl border border-[#DCDEE2] bg-black/5">
                        <Image
                          src={result[1]!.imagePath}
                          width={80}
                          height={80}
                          alt={result[1]!.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <RankBadge rank={2} />
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      <p className="text-[14px] leading-5 font-medium tracking-[-0.6px] text-[#686F7E]">
                        {result[1]!.name}
                      </p>
                      <p className="text-[16px] leading-[22px] font-bold tracking-[-0.6px] text-[#2D3037]">
                        {formatPrice(result[1]!.price)}
                      </p>
                      {!!result[1]!.tags?.length && (
                        <div className="mt-1 flex flex-col gap-[6px]">
                          {result[1]!.tags.map(tag => (
                            <div
                              key={tag.name}
                              className="inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1"
                              style={{ backgroundColor: tag.backgroundColor }}
                            >
                              <span style={{ color: tag.iconColor }}>{renderIcon(tag.icon)}</span>
                              <span
                                className="text-center text-[12px] leading-[18px] font-semibold tracking-[-0.4px]"
                                style={{ color: tag.textColor }}
                              >
                                {tag.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* 3-4위 */}
                <section className="mt-8 flex flex-col items-center px-[30px] pb-5">
                  <p className="text-center text-[14px] leading-[18px] font-semibold tracking-[-0.4px] text-[#2D3037]">
                    ****** 3-4위 - 준결승 탈락템 ******
                  </p>
                  <div className="mt-5 flex w-full items-start justify-center gap-10">
                    {result.slice(2, 4).map(product => (
                      <div key={product.name} className="flex w-20 flex-col items-center">
                        <div className="h-20 w-20 overflow-hidden rounded-xl border border-[#DCDEE2] bg-black/5">
                          <Image
                            src={product.imagePath}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="mt-4 flex flex-col items-center gap-1">
                          <p className="line-clamp-2 text-center text-[12px] leading-[18px] font-normal tracking-[-0.4px] text-[#686F7E]">
                            {product.name}
                          </p>
                          <p className="text-center text-[14px] leading-5 font-semibold tracking-[-0.6px] text-[#2D3037]">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* 스크롤 끝: 점선 + Have a nice @piki.day + 물결 */}
              <div className="bg-white pt-8">
                <div className="h-px border-t border-dashed border-[#DCDEE2]" />
                <div className="flex w-full items-center justify-center py-2">
                  <p
                    className={cn(
                      geistMono.className,
                      'text-center text-[14px] leading-4.5 font-semibold tracking-[-0.4px] text-[#2D3037]'
                    )}
                  >
                    •Have a nice @piki.day•
                  </p>
                </div>
              </div>

              {/* 물결 SVG — 영수증 끝 톱니 모양 (스크롤 끝까지 내려야 보임) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="299"
                height="22"
                viewBox="0 0 299 22"
                fill="none"
                preserveAspectRatio="none"
                className="-mt-px block w-full shrink-0"
                aria-hidden
              >
                <path
                  d="M0 0V22H5.34136C8.78615 20.3464 10.4118 16.1393 14.3694 16.1393C18.898 16.1393 19.7688 20.3707 22.8943 22H28.255C31.3805 20.3788 32.2514 16.1393 36.7799 16.1393C41.3084 16.1393 42.1793 20.3707 45.3048 22H50.6655C53.791 20.3788 54.6618 16.1393 59.1904 16.1393C63.7189 16.1393 64.5898 20.3707 67.7153 22H73.076C76.2015 20.3788 77.0723 16.1393 81.6009 16.1393C86.1294 16.1393 87.0003 20.3707 90.1258 22H95.4865C98.6119 20.3788 99.4828 16.1393 104.011 16.1393C108.54 16.1393 109.411 20.3707 112.536 22H117.897C121.022 20.3788 121.893 16.1393 126.422 16.1393C130.95 16.1393 131.821 20.3707 134.947 22H140.307C143.433 20.3788 144.304 16.1393 148.832 16.1393C153.361 16.1393 154.232 20.3707 157.357 22H162.718C165.843 20.3788 166.714 16.1393 171.243 16.1393C175.771 16.1393 176.642 20.3707 179.768 22H185.128C188.254 20.3788 189.125 16.1393 193.653 16.1393C198.182 16.1393 199.053 20.3707 202.178 22H207.539C210.664 20.3788 211.535 16.1393 216.064 16.1393C220.592 16.1393 221.463 20.3707 224.589 22H229.949C233.075 20.3788 233.946 16.1393 238.474 16.1393C243.003 16.1393 243.874 20.3707 246.999 22H252.36C255.485 20.3788 256.356 16.1393 260.885 16.1393C265.413 16.1393 266.284 20.3707 269.41 22H274.77C277.896 20.3788 278.767 16.1393 283.295 16.1393C287.824 16.1393 288.695 20.3707 291.82 22H297.181C297.878 21.6352 298.468 21.1489 299 20.6057V0"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
