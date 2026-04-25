import Link from 'next/link';

import ReceiptDrawMachine from './_components/ReceiptDrawMachine';
import TournamentRankingSection from './_components/TournamentRankingSection';

function TournamentResultPage() {
  return (
    <main className="flex h-screen flex-col bg-[#eef1f3] px-[22px] pt-[67px] pb-[28px]">
      <section>
        <h1 className="text-center text-[36px] leading-snug font-bold tracking-[-0.9108px] text-[#171719]">
          이번에 구매할 상품은
        </h1>
      </section>

      <section className="min-h-0 flex-1 overflow-y-auto pt-[24px] pb-[20px]">
        <div className="mx-auto flex w-full max-w-[420px] flex-col gap-[24px]">
          <ReceiptDrawMachine />
          <TournamentRankingSection />
        </div>
      </section>

      <section className="shrink-0 space-y-[12px]">
        <button
          className="flex h-[64px] w-full items-center justify-center rounded-[12px] bg-black px-[30.016px] py-[12.864px] text-[18.39px] leading-normal font-semibold tracking-[0.1048px] text-white"
          type="button"
        >
          우승템 구매하기
        </button>
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
