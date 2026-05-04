'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import GoldMedalIcon from '@/assets/images/tournament/result/medal-1.svg';
import SilverMedalIcon from '@/assets/images/tournament/result/medal-2.svg';
import type { RankedProductT } from '@/types/product';

const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;

/** 영수증 하단 물결(스캘럽) — Figma 1054:1129 Vector와 유사한 반복 원형 패턴 */
const RECEIPT_BOTTOM_SCALLOP_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='8' viewBox='0 0 16 8'%3E%3Ccircle cx='8' cy='8' r='6' fill='%23D8DDE2'/%3E%3C/svg%3E";

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
      const startY = Math.max(receiptHeight + 96, 720);

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

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        repeat: 0,
      });

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
      <div className="relative z-30 h-[66px] shrink-0 rounded-[14px] bg-[linear-gradient(180deg,#b8c0c8_0%,#7f8892_52%,#b8c0c8_100%)] p-[6px] shadow-[inset_0_2px_8px_rgba(255,255,255,0.55),inset_0_-2px_8px_rgba(0,0,0,0.18)]">
        <div className="relative flex h-full items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#dfe4e8_0%,#9ca4ad_100%)]">
          <div
            className="relative z-40 h-[5px] w-[88%] rounded-full bg-[#2a2f35]/75"
            ref={slotBarRef}
          />
        </div>
      </div>
      {/** absolute 영수증이 레이아웃 높이를 갖도록 플로우 영역 확보 */}
      <div className="invisible -mt-8 min-h-0 flex-1 shrink-0" aria-hidden />

      {/** 슬롯에서 내려오는 영수증 — transform은 overflow:hidden 밖에서 적용 */}
      <div className="pointer-events-none absolute inset-x-0 top-[34px] bottom-0 z-40 overflow-hidden">
        <div
          ref={receiptPaperRef}
          className="pointer-events-auto mx-auto flex h-full min-h-0 w-[78%] flex-col will-change-transform"
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-[6px] border border-[#d8dde2] bg-[#f8f9fb] shadow-[0_6px_16px_rgba(0,0,0,0.1)]">
            <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 pt-[18px]">
              {/** 1등 */}
              <section className="flex flex-col items-center border-b border-dashed border-[#DCDEE2] pb-6">
                <p className="text-center text-[14px] leading-[18px] font-semibold tracking-[-0.4px] text-[#2D3037]">
                  1위 - 지금 사도 후회 없을 선택 🔥
                </p>

                <div className="relative mt-4 h-20 w-20 overflow-hidden rounded-xl bg-black/5">
                  <Image
                    src={result[0]!.imagePath}
                    width={80}
                    height={80}
                    alt="ORIGINALSTARDUST - 스타더스트"
                    className="h-full w-full object-cover"
                  />
                  <Image
                    src={GoldMedalIcon}
                    alt="1위 메달"
                    width={24}
                    height={28}
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                  />
                </div>

                <div className="mt-[18px] text-center tracking-[-0.6px]">
                  <p className="text-[14px] leading-5 font-medium text-[#686F7E]">
                    {result[0]!.name}
                  </p>
                  <p className="mt-1 text-[16px] leading-[22px] font-bold text-[#2D3037]">
                    {formatPrice(result[0]!.price)}
                  </p>
                </div>

                <div className="mt-3 flex w-full flex-col items-center gap-[6px]">
                  {result[0]!.tags?.map(tag => (
                    <div
                      className="inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1"
                      style={{ backgroundColor: tag.backgroundColor }}
                      key={tag.name}
                    >
                      <Image
                        src={tag.icon}
                        alt="1위 메달"
                        width={14}
                        height={14}
                        style={{ color: tag.iconColor }}
                      />
                      <span
                        className="text-center text-[12px] leading-[18px] font-semibold tracking-[-0.4px]"
                        style={{ color: tag.textColor }}
                      >
                        {tag.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/** 2등 */}
              <section className="flex flex-col items-center border-b border-dashed border-[#DCDEE2] pt-9 pb-6">
                <p className="text-center text-[16px] leading-[18px] font-semibold tracking-[-0.4px] text-[#2D3037]">
                  2위 - 끝까지 고민했던 선택 👀
                </p>

                <div className="relative mt-4 h-20 w-20 overflow-hidden rounded-xl bg-black/5">
                  <Image
                    src={result[1]!.imagePath}
                    width={80}
                    height={80}
                    alt="ORIGINALSTARDUST - 스타더스트"
                    className="h-full w-full object-cover"
                  />
                  <Image
                    src={SilverMedalIcon}
                    alt="2위 메달"
                    width={24}
                    height={28}
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                  />
                </div>

                <div className="mt-[18px] text-center tracking-[-0.6px]">
                  <p className="text-[14px] leading-5 font-medium text-[#686F7E]">
                    {result[1]!.name}
                  </p>
                  <p className="mt-1 text-[16px] leading-[22px] font-bold text-[#2D3037]">
                    {formatPrice(result[1]!.price)}
                  </p>
                </div>

                <div className="mt-3 flex w-full flex-col items-center gap-[6px]">
                  {result[1]!.tags?.map(tag => (
                    <div
                      className="inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1"
                      style={{ backgroundColor: tag.backgroundColor }}
                      key={tag.name}
                    >
                      <Image
                        src={tag.icon}
                        alt="1위 메달"
                        width={14}
                        height={14}
                        style={{ color: tag.iconColor }}
                      />
                      <span
                        className="text-center text-[12px] leading-[18px] font-semibold tracking-[-0.4px]"
                        style={{ color: tag.textColor }}
                      >
                        {tag.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/** 3-4등 */}
              <section className="flex flex-col items-center border-b border-dashed border-[#DCDEE2] pt-9 pb-9">
                <p className="text-center text-[16px] leading-[18px] font-semibold tracking-[-0.4px] text-[#2D3037]">
                  3-4위 준결승 탈락
                </p>

                <div className="mt-8 flex w-full items-start">
                  {result.slice(2, 4).map((product, productIndex) => (
                    <div
                      className="flex min-w-0 flex-1 items-center justify-center py-[10px]"
                      key={product.name}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative h-20 w-20 rounded-2xl">
                          <Image
                            src={product.imagePath}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="h-full w-full rounded-2xl bg-black/5 object-cover"
                          />
                          <div className="absolute top-[-10px] left-[-10px] flex h-5 w-5 items-center justify-center rounded-full bg-[#414B5A]">
                            <span className="text-[14px] leading-[18px] font-semibold tracking-[-0.4px] text-white">
                              {productIndex + 3}
                            </span>
                          </div>
                        </div>

                        <div className="flex w-[120px] flex-col items-center gap-1">
                          <p className="line-clamp-2 text-center text-[12px] leading-[18px] font-normal tracking-[-0.4px] text-[#686F7E]">
                            {product.name}
                          </p>
                          <p className="text-center text-[14px] leading-5 font-semibold tracking-[-0.6px] text-[#2D3037]">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/** 5-8등 */}
              <section className="flex w-full flex-col items-center">
                <div className="flex w-full flex-col items-center py-6">
                  <p className="text-center text-[16px] leading-[18px] font-semibold tracking-[-0.4px] text-[#2D3037]">
                    5~8위 이번엔 여기까지
                  </p>
                </div>

                <div className="flex w-full flex-col items-center justify-start divide-y divide-dashed divide-[#DCDEE2] pt-5">
                  {result.slice(4, 8).map((product, rankIndex) => (
                    <div className="w-full py-3" key={product.name}>
                      <div className="flex w-full items-center gap-4 py-0">
                        <div className="flex shrink-0 items-center gap-2">
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#414B5A]">
                            <span className="text-[10px] leading-[12px] font-semibold tracking-[-0.2px] text-white">
                              {rankIndex + 5}
                            </span>
                          </div>
                          <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[11.707px] bg-black/5">
                            <Image
                              src={product.imagePath}
                              alt={product.name}
                              width={60}
                              height={60}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col items-start justify-center">
                          <p className="line-clamp-2 w-[133px] text-left text-[12px] leading-[18px] font-normal tracking-[-0.4px] text-[#686F7E]">
                            {product.name}
                          </p>
                          <p className="text-left text-[14px] leading-5 font-semibold tracking-[-0.6px] text-[#2D3037]">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/** 하단 고정: 안내 + 찢어진 무늬 (스크롤 영역 밖) */}
            <div className="flex shrink-0 flex-col border-t border-dashed border-[#DCDEE2] bg-[#f8f9fb]">
              <div className="flex w-full items-center justify-center px-[19.2px] py-5">
                <p className="text-center font-mono text-[10px] leading-normal font-medium whitespace-nowrap text-[#ADB1BB]">
                  2026.04.30 기준으로 정리했어요
                </p>
              </div>
              <div
                className="h-2 w-full shrink-0 bg-[#f8f9fb]"
                style={{
                  backgroundImage: `url("${RECEIPT_BOTTOM_SCALLOP_DATA_URL}")`,
                  backgroundRepeat: 'repeat-x',
                  backgroundSize: '16px 8px',
                  backgroundPosition: 'bottom',
                }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
