import { LoginIconOutline, NotificationIconFill, PersonIconFill } from '@/assets/icons';
import PikiLogo from '@/assets/images/piki-logo.svg';
import BottomTabBar from '@/components/common/bottom-tab-bar';
import TournamentCard from '@/components/common/tournament-card';
import { MOCK_USERS } from '@/mocks/users';

import AddWishHomeDialog from '../_components/AddWishHomeDialog';
import CreateTournamentDialog from '../_components/CreateTournamentDialog';

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
              <AddWishHomeDialog />
              <CreateTournamentDialog />
            </div>

            {/* 초대 토너먼트 입장 */}
            <button
              type="button"
              className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[12px] bg-bg-layer-default px-9"
            >
              <LoginIconOutline className="size-6 text-icon-neutral-secondary" />
              <span className="body-1-semibold text-text-neutral-primary">초대 토너먼트 입장</span>
            </button>
          </div>
        </section>

        {/* 진행 중인 토너먼트 */}
        <section className="flex flex-col gap-3">
          <h2 className="heading-2 text-black">진행 중인 토너먼트</h2>
          <TournamentCard state="adding" name="토너먼트명" date="0000/00/00" users={MOCK_USERS} />
        </section>
      </main>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-[40px] left-1/2 z-20 -translate-x-1/2">
        <BottomTabBar />
      </div>
    </div>
  );
}

export default HomePage;
