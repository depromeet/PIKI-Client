'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/utils/cn';

type WheelColumnProps = {
  /** 휠에 노출할 값 목록 (예: ['1','2',...,'12']) */
  items: string[];
  /** 현재 선택된 인덱스 */
  selectedIndex: number;
  /** 선택이 바뀔 때 호출 */
  onChange: (index: number) => void;
  /** 한 항목 높이 (px) — 시안 기준 36 */
  itemHeight?: number;
  /** 표시되는 행 수 (홀수, 가운데가 선택). 시안 기준 5 */
  visibleRows?: number;
  className?: string;
};

/**
 * 한 열짜리 휠 picker.
 * - scroll-snap-y mandatory 로 자연스러운 휠 스냅
 * - 위·아래 행은 opacity 로 흐릿하게
 * - 스크롤 종료를 감지해 onChange 호출
 */
function WheelColumn({
  items,
  selectedIndex,
  onChange,
  itemHeight = 36,
  visibleRows = 5,
  className,
}: WheelColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const lastEmittedIndexRef = useRef(selectedIndex);

  const padRows = Math.floor(visibleRows / 2);
  const containerHeight = itemHeight * visibleRows;

  // 외부 selectedIndex 가 바뀌면 스크롤 위치를 맞춤 (초기 진입 포함).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = selectedIndex * itemHeight;
    lastEmittedIndexRef.current = selectedIndex;
  }, [selectedIndex, itemHeight]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(() => {
      const nextIndex = Math.round(el.scrollTop / itemHeight);
      const clamped = Math.max(0, Math.min(items.length - 1, nextIndex));
      if (clamped !== lastEmittedIndexRef.current) {
        lastEmittedIndexRef.current = clamped;
        onChange(clamped);
      }
    }, 80);
  };

  const getOpacity = (distance: number) => {
    if (distance === 0) return 1;
    if (distance === 1) return 0.4;
    return 0.2;
  };

  return (
    <div
      className={cn('relative', className)}
      style={{ height: containerHeight, width: '100%' }}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="hide-scrollbar h-full snap-y snap-mandatory overflow-y-scroll"
      >
        {/* 위/아래 패딩 — 첫·마지막 항목도 가운데 정렬되도록 */}
        <div style={{ height: itemHeight * padRows }} />
        {items.map((item, index) => {
          const distance = Math.abs(index - selectedIndex);
          return (
            <div
              key={`${item}-${index}`}
              className="flex snap-center items-center justify-center body-1-bold text-text-neutral-primary"
              style={{ height: itemHeight, opacity: getOpacity(distance) }}
            >
              {item}
            </div>
          );
        })}
        <div style={{ height: itemHeight * padRows }} />
      </div>

      {/* 가운데 선택 영역을 흐릿한 회색 줄로 표시 */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 left-0 rounded-md bg-bg-layer-basement/60"
        style={{ top: itemHeight * padRows, height: itemHeight }}
      />
    </div>
  );
}

export default WheelColumn;
