import BottomTabBar from '@/components/common/BottomTabBar';

// 홈
export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="fixed bottom-[40px] left-1/2 -translate-x-1/2 z-20">
        <BottomTabBar />
      </div>
    </div>
  );
}
