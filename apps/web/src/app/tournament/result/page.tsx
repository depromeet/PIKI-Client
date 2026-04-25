import Link from 'next/link';

import { mockProducts } from '@/mocks/products';

import ReceiptDrawMachine from './_components/ReceiptDrawMachine';
import TournamentRankingSection from './_components/TournamentRankingSection';

const winnerProduct = mockProducts[0]!;

function TournamentResultPage() {
  return (
    <main className="flex h-full flex-col px-5.5 pt-16.75 pb-7">
      <section>
        <h1 className="text-center text-[36px] leading-snug font-bold tracking-[-0.9108px] text-[#171719]">
          이번에 구매할 상품은
        </h1>
      </section>

      <section className="min-h-0 flex-1 overflow-y-auto pb-5">
        <div className="mx-auto flex w-full max-w-[420px] flex-col">
          <ReceiptDrawMachine />
          <TournamentRankingSection />
        </div>
      </section>

      <section className="shrink-0 space-y-[12px]">
        <a
          href={winnerProduct.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[64px] w-full items-center justify-center rounded-[12px] bg-black px-[30.016px] py-[12.864px] text-[18.39px] leading-normal font-semibold tracking-[0.1048px] text-white"
        >
          우승템 구매하기
        </a>
        <Link
          className="flex h-[64px] w-full items-center justify-center rounded-[14px] bg-[#d7dbe0] px-[24px] py-[16px] text-[17px] leading-[24px] font-semibold tracking-[-0.1px] text-[#6c7783]"
          href="/coming-soon"
        >
          위시리스트 저장하고 싶다면?
        </Link>
      </section>
    </main>
  );
}

export default TournamentResultPage;
