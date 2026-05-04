import Image from 'next/image';
import Link from 'next/link';

function ComingSoonPage() {
  return (
    <main className="flex h-full flex-col px-5.5 pt-[calc(env(safe-area-inset-top)+60px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <section className="text-center">
        <h1 className="text-[36px] leading-snug font-extrabold tracking-[-0.6px] text-[#171719]">
          아직 준비 중이에요
        </h1>
        <p className="mt-2 text-[18px] font-medium tracking-[-0.6px] text-[#ADB1BB]">
          더 개선된 서비스로 돌아올게요
        </p>
      </section>

      <section className="relative mt-6 flex flex-1 flex-col items-center">
        <Image
          src="/images/home-empty-basket-v2.png"
          alt="장바구니"
          fill
          sizes="(max-width: 480px) calc(100vw - 44px), 358px"
          priority
          className="object-contain"
        />

        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="rounded-[20px] bg-white/70 p-2 backdrop-blur-[2px]">
            <div className="mb-3 text-center text-[48px] font-bold tracking-[-0.96px]">
              COMING
              <br />
              SOON
            </div>
            <div className="text-center text-[32px] font-semibold tracking-[-0.96px]">26-06-26</div>
          </div>

          <a
            href="https://forms.gle/qcnMcNX6gkW68vcQ8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 flex size-20 cursor-pointer items-center justify-center rounded-full bg-[#1F7af9] text-center text-[44px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="의견 남기기 폼으로 이동 (새 탭)"
          >
            🔗
          </a>

          <div className="mt-5 rounded-full bg-white/70 px-5 py-4 text-[18px] font-semibold tracking-[-0.36px] whitespace-nowrap backdrop-blur-[2px]">
            딱 30초! 의견 남기러 가기
          </div>
        </div>
      </section>

      <section className="mt-auto w-full border-t border-[#F4F4F6] pt-6">
        <Link
          href="/"
          className="flex h-[54px] w-full items-center justify-center rounded-[12px] bg-black px-[30.016px] py-[12.864px] text-[18.39px] leading-normal font-semibold tracking-[0.1048px] text-white"
          type="button"
        >
          홈으로 돌아가기
        </Link>
      </section>
    </main>
  );
}

export default ComingSoonPage;
