function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-bg-layer-basement">
      {/* 상단 헤더 */}
      <header className="flex justify-end gap-3 px-5 pt-[60px]">
        <button type="button" aria-label="마이페이지" className="p-[3px]">
          <span className="block size-6 rounded-full bg-gray-300" />
        </button>
        <button type="button" aria-label="알림" className="p-[3px]">
          <span className="block size-6 rounded-full bg-gray-300" />
        </button>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="mx-auto mt-[54px] flex w-[362px] flex-col gap-12">
        {/* 로고 + CTA 영역 */}
        <section className="flex flex-col items-center gap-12">
          {/* PIKI 로고 placeholder */}
          <div className="flex h-[106px] w-[145px] items-center justify-center text-2xl font-bold text-black">
            PIKI
          </div>

          {/* CTA 카드 + 초대 입장 */}
          <div className="flex w-full flex-col gap-3">
            {/* 위시 담기 / 토너먼트 만들기 2분할 */}
            <div className="flex w-full gap-3">
              <button
                type="button"
                className="flex flex-1 flex-col items-center gap-2 rounded-[12px] bg-bg-layer-default p-5"
              >
                <span className="block size-8 rounded-full bg-red-300" aria-hidden />
                <span className="body-1-semibold text-text-neutral-primary">위시 담기</span>
              </button>
              <button
                type="button"
                className="flex flex-1 flex-col items-center gap-2 rounded-[12px] bg-bg-layer-default p-5"
              >
                <span className="block size-8 rounded-full bg-yellow-300" aria-hidden />
                <span className="body-1-semibold text-text-neutral-primary">토너먼트 만들기</span>
              </button>
            </div>

            {/* 초대 토너먼트 입장 */}
            <button
              type="button"
              className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[12px] bg-bg-layer-default px-9"
            >
              <span className="block size-6 rounded-full bg-gray-300" aria-hidden />
              <span className="body-1-semibold text-text-neutral-primary">초대 토너먼트 입장</span>
            </button>
          </div>
        </section>

        {/* 진행 중인 토너먼트 */}
        <section className="flex flex-col gap-3">
          <h2 className="heading-2 text-black">진행 중인 토너먼트</h2>
          {/* TournamentCard placeholder */}
          <div className="flex h-[103px] w-full flex-col justify-center gap-2 rounded-[12px] bg-bg-layer-default px-6 py-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-yellow-50 px-2 py-1 caption-1-semibold text-yellow-700">
                  담는 중
                </span>
                <span className="heading-1 text-text-neutral-primary">토너먼트명</span>
              </div>
              <span className="block size-6 rounded-full bg-gray-200" aria-hidden />
            </div>
            <div className="flex items-end justify-between">
              <span className="body-2-medium text-gray-300">0000/00/00</span>
              <div className="flex items-center">
                <span className="-mr-1 block size-[27px] rounded-full bg-blue-300" />
                <span className="-mr-1 block size-[27px] rounded-full bg-yellow-300" />
                <span className="-mr-1 block size-[27px] rounded-full bg-gray-200" />
                <span className="flex size-[27px] items-center justify-center rounded-full bg-gray-100 body-2-semibold text-gray-300">
                  +N
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-[28px] left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-bg-layer-default p-1 shadow-[0_0_8px_rgba(0,0,0,0.04)]">
        <button
          type="button"
          className="flex w-20 flex-col items-center justify-center gap-1 rounded-full bg-gray-50 py-[9px]"
        >
          <span className="block size-6 rounded-full bg-gray-600" aria-hidden />
          <span className="text-[11px] text-text-neutral-secondary">홈</span>
        </button>
        <button
          type="button"
          className="flex w-20 flex-col items-center justify-center gap-1 py-[9px]"
        >
          <span className="block size-6 rounded-full bg-gray-300" aria-hidden />
          <span className="text-[11px] text-text-neutral-tertiary">보관</span>
        </button>
      </nav>
    </div>
  );
}

export default HomePage;
