'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { MOCK_FLOATING_ITEMS } from '@/mocks/floatingItems';

import FloatingProducts from './_components/FloatingProducts';
import LoadingBar from './_components/LoadingBar';

const LOADING_DURATION_MS = 4000;

function TournamentLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/tournament');
    }, LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-dvh flex-col pt-6 pb-6">
      <header className="flex flex-col gap-2 tracking-[-0.6px]">
        <h1 className="text-[28px] leading-10 font-bold text-text-neutral-primary">
          대진표를 만드는 중이에요
        </h1>
        <p className="heading-2-medium text-text-neutral-tertiary">8개 후보를 빠르게 정리할게요</p>
      </header>

      <div className="mt-15">
        <LoadingBar />
      </div>

      <div className="mt-5 flex flex-1 flex-col pb-4">
        <FloatingProducts items={MOCK_FLOATING_ITEMS} />
      </div>
    </main>
  );
}

export default TournamentLoadingPage;
