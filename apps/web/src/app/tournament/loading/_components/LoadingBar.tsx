'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import SpinnerIcon from '@/assets/icons/spinner.svg';

const DURATION_MS = 4500;
const TICK_MS = 60;

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const next = Math.min(elapsed / DURATION_MS, 1);
      setProgress(next);
      if (next >= 1) window.clearInterval(interval);
    }, TICK_MS);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="self-start">
        <div className="flex items-center gap-1 rounded-xl bg-white px-3 py-2.5">
          <Image
            src={SpinnerIcon}
            alt=""
            aria-hidden
            className="size-4 animate-spin object-contain"
          />
          <p className="text-base leading-5.5 font-medium tracking-[-0.6px] text-[#686F7E]">
            상품 불러오는 중
          </p>
        </div>
        <div className="ml-4 size-0 border-x-8 border-t-6 border-x-transparent border-t-white" />
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded bg-[#DCDEE2]">
        <div
          className="absolute inset-y-0 left-0 rounded bg-[#1F7AF9] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
