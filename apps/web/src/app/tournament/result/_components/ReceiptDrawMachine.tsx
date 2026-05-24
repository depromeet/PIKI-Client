'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import ReceiptPrinterImg from '@/assets/images/tournament/result/receipt-printer.png';

import type { RankedProductT } from '../../types/tournamentTypes';
import ReceiptPaper from './ReceiptPaper';

/** 프린터 래퍼 aspect ratio (디자인 박스) */
const PRINTER_ASPECT_NUMERATOR = 267;
const PRINTER_ASPECT_DENOMINATOR = 62;
/** 프린터 프레임 하단(슬롯)과 영수증 상단이 겹치는 픽셀 — 슬롯 안에서 영수증이 빠져나오는 효과 */
const RECEIPT_SLOT_OVERLAP_PX = 12;

type ReceiptDrawMachineProps = {
  tournamentName: string;
  result: RankedProductT[];
  date: Date;
};

function ReceiptDrawMachine({ tournamentName, result, date }: ReceiptDrawMachineProps) {
  const animationScopeRef = useRef<HTMLDivElement | null>(null);
  const printerFrameRef = useRef<HTMLDivElement | null>(null);
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
    <div
      className="relative isolate flex min-h-0 w-full flex-1 flex-col items-center"
      ref={animationScopeRef}
    >
      {/* 영수증 종이 — 슬롯에서 빠져나오는 시각 효과를 위해 프린터보다 낮은 z-index */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex justify-center will-change-transform"
        style={{
          paddingTop: `calc(${(PRINTER_ASPECT_DENOMINATOR / PRINTER_ASPECT_NUMERATOR) * 100}% - ${RECEIPT_SLOT_OVERLAP_PX}px)`,
        }}
        ref={receiptPaperRef}
      >
        <ReceiptPaper tournamentName={tournamentName} result={result} date={date} />
      </div>

      {/* 프린터 (영수증 위로 덮음) */}
      <div
        className="relative z-30 w-full shrink-0"
        ref={printerFrameRef}
        style={{ aspectRatio: `${PRINTER_ASPECT_NUMERATOR}/${PRINTER_ASPECT_DENOMINATOR}` }}
      >
        <Image
          src={ReceiptPrinterImg}
          alt="영수증 기계"
          className="h-full w-full object-contain"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-[5px]" ref={slotBarRef} />
      </div>

      {/* 영수증 종이 영역 공간 확보 (layout reserved) */}
      <div className="invisible flex w-full justify-center" aria-hidden>
        <ReceiptPaper tournamentName={tournamentName} result={result} date={date} />
      </div>
    </div>
  );
}

export default ReceiptDrawMachine;
