'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { MOCK_PRODUCTS } from '@/consts/mockProducts';

import FloatingProducts from './_components/FloatingProducts';
import LoadingBar from './_components/LoadingBar';

const MOCK_CANDIDATE_COUNT = MOCK_PRODUCTS.length;
const LOADING_DURATION_MS = 6000;

export default function TournamentLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/tournament');
    }, LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-full flex-col px-[21.33px] pt-[80px]">
      {/* 헤더 */}
      <div className="flex flex-col gap-[10px]">
        <p className="text-[25px] font-bold leading-[137.5%] tracking-[-0.632px] text-[#171719]">
          대진표 만드는 중...
        </p>
        <p className="text-[18px] font-medium leading-5 tracking-[-0.15px] text-[#737373]">
          {MOCK_CANDIDATE_COUNT}개 후보를 빠르게 정리할게요
        </p>
      </div>

      {/* 로딩바 */}
      <div className="mt-[81px]">
        <LoadingBar />
      </div>

      {/* 상품 물리 애니메이션 */}
      <div className="mt-5 flex flex-1 flex-col pb-4">
        <FloatingProducts products={MOCK_PRODUCTS} />
      </div>
    </div>
  );
}
