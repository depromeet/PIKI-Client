'use client';
import Link from 'next/link';

import { dummyProducts } from '@/mocks/products';

import ReceiptDrawMachine from './_components/ReceiptDrawMachine';

function TournamentResultPage() {
  // const _result = localStorage.getItem('piki:result');
  // if (!_result) return <div>no result</div>;

  // const result = JSON.parse(_result) as RankedProductT[];
  const result = dummyProducts.map((product, i) => ({ ...product, rank: i + 1 }));
  const orderedResult = result.sort((a, b) => a.rank - b.rank);

  return (
    <main className="flex h-full flex-col overflow-x-hidden pt-[calc(env(safe-area-inset-top)+60px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <section className="flex min-h-0 flex-1 flex-col space-y-[22px] overflow-x-hidden px-5 pb-10">
        <h1 className="shrink-0 text-center text-[28px] font-bold tracking-[-0.6px] text-[#2D3037]">
          이번에 구매할 상품은
        </h1>

        <div className="mx-auto flex min-h-0 w-full max-w-[420px] flex-1 flex-col">
          <ReceiptDrawMachine result={orderedResult} />
        </div>
      </section>

      <section className="shrink-0 space-y-[12px] border-t border-[#F4F4F6] px-5 pt-0 pb-[calc(34px+env(safe-area-inset-bottom))]">
        <a
          href={orderedResult[0]!.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[54px] w-full items-center justify-center rounded-[12px] bg-black text-[16px] leading-normal font-semibold -tracking-[0.6px] text-white"
        >
          1위 바로 구매하기
        </a>
        <Link
          className="flex h-[54px] w-full items-center justify-center rounded-[12px] border border-[#C5C8CE] bg-white text-[16px] leading-normal font-semibold -tracking-[0.6px] text-[#2D3037]"
          href="/coming-soon"
        >
          일단 저장해두기
        </Link>
      </section>
    </main>
  );
}

export default TournamentResultPage;
