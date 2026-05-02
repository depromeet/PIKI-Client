'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useWishes } from '@/hooks/useWishes';
import { DUMMY_POSITIONS } from '@/mocks/dummyWishes';

import FloatingProducts, { type FloatingItemT } from './_components/FloatingProducts';
import LoadingBar from './_components/LoadingBar';

const LOADING_DURATION_MS = 4500;
const DUMMY_PREFIX = 'dummy-';

export default function TournamentLoadingPage() {
  const router = useRouter();
  const wishesQuery = useWishes();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/tournament');
    }, LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [router]);

  const items = useMemo<FloatingItemT[]>(() => {
    const wishes = wishesQuery.data ?? [];
    return wishes.map(wish => {
      const isDummy = wish.wishId.startsWith(DUMMY_PREFIX);
      if (isDummy) {
        const dummyIndex = Number(wish.wishId.replace(DUMMY_PREFIX, '')) - 1;
        return {
          id: wish.wishId,
          emoji: DUMMY_POSITIONS[dummyIndex]?.emoji ?? '🛒',
        };
      }
      return {
        id: wish.wishId,
        imageUrl: wish.imageUrl,
      };
    });
  }, [wishesQuery.data]);

  return (
    <main className="flex h-full flex-col bg-[#F4F4F6] px-5 pt-[calc(env(safe-area-inset-top)+24px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <header className="flex flex-col gap-2 tracking-[-0.6px]">
        <h1 className="text-[28px] leading-10 font-bold text-[#2D3037]">
          대진표를 만드는 중이에요
        </h1>
        <p className="text-lg leading-6.5 font-medium text-[#ADB1BB]">
          8개 후보를 빠르게 정리할게요
        </p>
      </header>

      <div className="mt-15">
        <LoadingBar />
      </div>

      <div className="mt-5 flex flex-1 flex-col pb-4">
        {items.length > 0 && <FloatingProducts items={items} />}
      </div>
    </main>
  );
}
