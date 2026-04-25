import Image from 'next/image';

function HomePage() {
  return (
    <main className="relative flex h-full flex-col overflow-x-hidden px-5 pt-[calc(env(safe-area-inset-top)+32px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <h1 className="text-center text-[28px] leading-[1.375] font-bold tracking-[-0.7084px] text-[#171719]">
        고민 중인 것들, 여기 모아봐요
      </h1>
      <p className="mt-2 text-center text-base leading-[1.375] font-semibold tracking-[-0.4048px] text-[#A4A4A4]">
        8개가 모이면 하나를 골라드릴게요
      </p>

      <div className="relative mx-auto mt-32 aspect-259/373 w-[85%]">
        <Image
          src="/images/home-empty-basket-v2.png"
          alt="빈 장바구니"
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          priority
          className="object-contain"
        />

        <button
          type="button"
          aria-label="아이템 추가"
          className="absolute top-1/2 left-1/2 flex h-[55px] w-[55px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1B1C1E]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F7F7F8"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[26px] w-[26px]"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </main>
  );
}

export default HomePage;
