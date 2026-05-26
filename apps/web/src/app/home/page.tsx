import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { LoginIconOutline } from '@/assets/icons';
import PikiLogo from '@/assets/images/piki-logo.svg';
import BottomTabBar from '@/components/common/bottom-tab-bar';
import { Header, HeaderIcon } from '@/components/common/header';
import { TOURNAMENT_STATUS } from '@/consts/tournament';
import { getQueryClient } from '@/utils/queryClient';

import { getTournamentList } from './_apis/getTournamentList';
import AddWishHomeDialog from './_components/AddWishHomeDialog';
import CreateTournamentDialog from './_components/CreateTournamentDialog';
import TorunamentList from './_components/TournamentList';

async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tournamentList', [TOURNAMENT_STATUS.PENDING, TOURNAMENT_STATUS.IN_PROGRESS]],
    queryFn: () => getTournamentList([TOURNAMENT_STATUS.PENDING, TOURNAMENT_STATUS.IN_PROGRESS]),
  });

  return (
    <div className="relative flex min-h-dvh flex-col bg-bg-layer-basement pt-9 pb-32">
      {/* 상단 헤더 */}
      <Header
        right={
          <>
            <HeaderIcon name="PROFILE" />
            <HeaderIcon name="ALARM" />
          </>
        }
      />
      {/* 메인 컨텐츠 */}
      <main className="mt-[54px] flex w-full flex-col gap-12 px-5">
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
              className="flex h-[54px] w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-bg-layer-default px-9"
            >
              <LoginIconOutline className="size-6 text-icon-neutral-secondary" />
              <span className="body-1-semibold text-text-neutral-primary">초대 토너먼트 입장</span>
            </button>
          </div>
        </section>

        {/* 진행 중인 토너먼트 */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TorunamentList />
        </HydrationBoundary>
      </main>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-[40px] left-1/2 z-20 -translate-x-1/2">
        <BottomTabBar />
      </div>
    </div>
  );
}

export default HomePage;
