'use client';

import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';

import { mockProducts } from '@/mocks/products';

const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;

const receiptItems = mockProducts.slice(0, 3).map(product => ({
  name: product.name,
  price: formatPrice(product.price),
}));

function ReceiptDrawMachine() {
  const animationScopeRef = useRef<HTMLDivElement | null>(null);
  const receiptPaperRef = useRef<HTMLDivElement | null>(null);
  const slotBarRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const animationScopeElement = animationScopeRef.current;
    const receiptPaperElement = receiptPaperRef.current;
    const slotBarElement = slotBarRef.current;

    if (!animationScopeElement || !receiptPaperElement || !slotBarElement) return;

    const context = gsap.context(() => {
      gsap.set(receiptPaperElement, { y: -520, rotate: -0.8, transformOrigin: 'top center' });

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        repeat: 0,
      });

      timeline
        .to(slotBarElement, {
          duration: 0.14,
          x: -2.5,
          yoyo: true,
          repeat: 3,
          ease: 'power1.inOut',
        })
        .to(
          slotBarElement,
          { duration: 0.16, scaleX: 0.98, scaleY: 1.06, transformOrigin: 'center center' },
          '<'
        )
        .to(
          receiptPaperElement,
          { duration: 0.2, y: -470, rotate: -0.25, ease: 'power1.inOut' },
          '-=0.04'
        )
        .to(receiptPaperElement, { duration: 1.35, y: 0, rotate: 0, ease: 'power3.out' })
        .to(slotBarElement, { duration: 0.22, scaleX: 1, scaleY: 1, ease: 'power1.out' }, '<')
        .to(receiptPaperElement, {
          duration: 0.3,
          y: 0,
          x: -1.3,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        });
    }, animationScopeElement);

    return () => context.revert();
  }, []);

  return (
    <div className="relative isolate w-full" ref={animationScopeRef}>
      <div className="relative z-30 h-[66px] rounded-[14px] bg-[linear-gradient(180deg,#b8c0c8_0%,#7f8892_52%,#b8c0c8_100%)] p-[6px] shadow-[inset_0_2px_8px_rgba(255,255,255,0.55),inset_0_-2px_8px_rgba(0,0,0,0.18)]">
        <div className="relative flex h-full items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#dfe4e8_0%,#9ca4ad_100%)]">
          <div className="relative z-40 h-[5px] w-[88%] rounded-full bg-[#2a2f35]/75" ref={slotBarRef} />
        </div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[34px] z-40 h-[530px] w-[78%] -translate-x-1/2 overflow-hidden">
        <div
          className="rounded-b-[6px] border border-[#d8dde2] bg-[#f8f9fb] px-[16px] pt-[18px] pb-[16px] shadow-[0_6px_16px_rgba(0,0,0,0.1)]"
          ref={receiptPaperRef}
        >
          <div className="space-y-[13px] border-b border-[#cfd6dd] pb-[12px]">
            {receiptItems.map(receiptItem => (
              <div className="flex items-center justify-between" key={receiptItem.name}>
                <div>
                  <p className="text-[11px] leading-[15px] font-semibold tracking-[0.2px] text-[#2f3338]">
                    {receiptItem.name}
                  </p>
                  <p className="mt-[2px] text-[10px] leading-[13px] font-medium text-[#4c5259]">
                    NOW ONLY: {receiptItem.price}
                  </p>
                  <p className="text-[10px] leading-[13px] font-bold text-[#2f3338]">DISCOUNT: 1/2 PRICE</p>
                </div>
                <div className="h-[48px] w-[62px] rounded-[6px] border border-dashed border-[#b7bec6] bg-[#eceff3]" />
              </div>
            ))}
          </div>
          <div className="pt-[12px] text-center">
            <p className="text-[24px] leading-[28px]">🧾</p>
            <p className="mt-[4px] text-[14px] leading-[18px] font-bold text-[#2f3338]">YOU SAVED £100!</p>
            <div className="mt-[8px] h-[14px] rounded-[2px] bg-[repeating-linear-gradient(90deg,#2f3338_0px,#2f3338_2px,transparent_2px,transparent_4px)]" />
          </div>
        </div>
      </div>
      <div aria-hidden className="mx-auto h-72 w-[94%] opacity-0" />
    </div>
  );
}

export default ReceiptDrawMachine;
