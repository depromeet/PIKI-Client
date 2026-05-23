import {
  HeartIconFill,
  HeartIconOutline,
  LoginIconOutline,
  NotificationIconFill,
  PersonIconFill,
  TrophyIconFill,
} from '@/assets/icons';
import PikiLogo from '@/assets/images/piki-logo.svg';
import TournamentCard from '@/components/common/TournamentCard/TournamentCard';
import { MOCK_USERS } from '@/mocks/users';

function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-bg-layer-basement pb-32">
      {/* 상단 헤더 */}
      <header className="flex justify-end gap-3 px-5 pt-[60px]">
        <button type="button" aria-label="마이페이지" className="p-[3px]">
          <PersonIconFill className="size-6 text-icon-neutral-secondary" />
        </button>
        <button type="button" aria-label="알림" className="p-[3px]">
          <NotificationIconFill className="size-6 text-icon-neutral-secondary" />
        </button>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="mx-auto mt-[54px] flex w-[362px] flex-col gap-12">
        {/* 로고 + CTA 영역 */}
        <section className="flex flex-col items-center gap-12">
          {/* PIKI 로고 */}
          <PikiLogo aria-label="PIKI" />
          <h1 className="sr-only">PIKI</h1>

          {/* CTA 카드 + 초대 입장 */}
          <div className="flex w-full flex-col gap-3">
            {/* 위시 담기 / 토너먼트 만들기 2분할 */}
            <div className="flex w-full gap-3">
              <button
                type="button"
                className="flex flex-1 flex-col items-center gap-2 rounded-[12px] bg-bg-layer-default p-5"
              >
                <HeartIconFill className="size-8 text-red-400" />
                <span className="body-1-semibold text-text-neutral-primary">위시 담기</span>
              </button>
              <button
                type="button"
                className="flex flex-1 flex-col items-center gap-2 rounded-[12px] bg-bg-layer-default p-5"
              >
                <TrophyIconFill className="size-8 text-yellow-400" />
                <span className="body-1-semibold text-text-neutral-primary">토너먼트 만들기</span>
              </button>
            </div>

            {/* 초대 토너먼트 입장 */}
            <button
              type="button"
              className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[12px] bg-bg-layer-default px-9"
            >
              <LoginIconOutline className="size-6 text-text-neutral-primary" />
              <span className="body-1-semibold text-text-neutral-primary">초대 토너먼트 입장</span>
            </button>
          </div>
        </section>

        {/* 진행 중인 토너먼트 */}
        <section className="flex flex-col gap-3">
          <h2 className="heading-2 text-black">진행 중인 토너먼트</h2>
          <TournamentCard
            state="adding"
            name="토너먼트명"
            date="0000/00/00"
            users={MOCK_USERS}
          />
        </section>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-[28px] left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-bg-layer-default p-1 shadow-[0_0_8px_rgba(0,0,0,0.04)]">
        <button
          type="button"
          aria-label="홈"
          aria-current="page"
          className="flex w-20 flex-col items-center justify-center gap-1 rounded-full bg-gray-50 py-[9px]"
        >
          {/* TODO: HomeIcon 추가 필요 */}
          <span className="block size-6 rounded-md bg-gray-600" aria-hidden />
          <span className="text-[11px] text-text-neutral-secondary">홈</span>
        </button>
        <button
          type="button"
          aria-label="보관"
          className="flex w-20 flex-col items-center justify-center gap-1 py-[9px]"
        >
          <HeartIconOutline className="size-6 text-text-neutral-tertiary" />
          <span className="text-[11px] text-text-neutral-tertiary">보관</span>
        </button>
      </nav>
    </div>
  );
}

export default HomePage;
