import TrophyIconFill from '@/assets/icons/fill/trophy.svg';
import BottomTabBar from '@/components/common/bottom-tab-bar';

function TournamentHistoryContent() {
  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-center gap-3 pb-24">
        <TrophyIconFill width={32} height={32} className="text-gray-200" />
        <p className="body-1-semibold text-text-neutral-tertiary">아직 진행한 토너먼트가 없어요</p>
      </main>
      <div className="fixed bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <BottomTabBar />
      </div>
    </>
  );
}

export default TournamentHistoryContent;
