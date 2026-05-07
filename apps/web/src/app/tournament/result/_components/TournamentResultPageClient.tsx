'use client';

import Link from 'next/link';

import type { RankedProductT } from '@/types/product';
import { readPikiResultAsRankedProducts } from '@/utils/pikiResultStorage';

import ReceiptDrawMachine from './ReceiptDrawMachine';

export default function TournamentResultPageClient() {
  /** 토너먼트 결과 페이지는 `page.tsx`에서 dynamic(ssr:false)로만 불러와 서버에서 실행되지 않음 */
  const unsorted = readPikiResultAsRankedProducts();
  const orderedResult: RankedProductT[] | null =
    unsorted === null ? null : [...unsorted].sort((left, right) => left.rank - right.rank);

  if (orderedResult === null) return <div>no result</div>;

  return (
    <main className="flex h-full flex-col overflow-x-hidden bg-[#F4F4F6] pt-[calc(env(safe-area-inset-top)+60px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <section className="flex min-h-0 flex-1 flex-col space-y-[22px] overflow-x-hidden pb-[40.5px]">
        <h1 className="shrink-0 px-5 text-center text-[28px] leading-10 font-bold tracking-[-0.6px] text-[#2D3037]">
          이번에 구매할 상품은
        </h1>

        <div className="mx-auto flex min-h-0 w-full max-w-[420px] flex-1 flex-col">
          <ReceiptDrawMachine result={orderedResult} />
        </div>
      </section>

      <section className="flex shrink-0 gap-3 border-t border-[#F4F4F6] px-2.5 pt-3 pb-[calc(34px+env(safe-area-inset-bottom))]">
        <a
          href={orderedResult[0]!.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[54px] flex-1 items-center justify-center rounded-[12px] border-[1.2px] border-[#C5C8CE] bg-white text-[16px] leading-5.5 font-semibold -tracking-[0.6px] text-[#2D3037]"
        >
          1위 바로 구매하기
        </a>
        <Link
          className="flex h-[54px] flex-1 items-center justify-center rounded-[12px] bg-[#191B1F] text-[16px] leading-5.5 font-semibold -tracking-[0.6px] text-[#F7F7F8]"
          href="/coming-soon"
        >
          일단 저장해두기
        </Link>
      </section>
    </main>
  );
}
