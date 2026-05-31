'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';

import BottomCta from '@/components/common/bottom-cta';
import ActionSnackbar from '@/components/common/toast/ActionSnackbar';
import { readResult } from '@/utils/resultStorage';

import type { RankedProductT } from '../_types/tournament';
import ReceiptDrawMachine from './_components/ReceiptDrawMachine';

const TOAST_DURATION_MS = 3000;
// TODO: 토너먼트 생성 시 입력한 이름을 store/URL에서 가져오기
const TOURNAMENT_NAME_FALLBACK = '봄 아우터 고르기';

const subscribeResult = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

let cachedClientResult: RankedProductT[] | null = null;
const getClientResultSnapshot = (): RankedProductT[] | null => {
  const stored = readResult();
  if (!stored) {
    cachedClientResult = null;
    return null;
  }
  // 캐시로 referential equality 유지 (useSyncExternalStore 무한 렌더 방지)
  if (
    cachedClientResult &&
    cachedClientResult.length === stored.length &&
    cachedClientResult.every((item, index) => item.rank === stored[index]?.rank)
  ) {
    return cachedClientResult;
  }
  cachedClientResult = [...stored].sort((a, b) => a.rank - b.rank);
  return cachedClientResult;
};
const getServerResultSnapshot = (): RankedProductT[] | null => null;

function TournamentResultPage() {
  const router = useRouter();
  const result = useSyncExternalStore(
    subscribeResult,
    getClientResultSnapshot,
    getServerResultSnapshot
  );
  const [date] = useState(() => new Date());
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!isToastVisible) return;
    const timeoutId = window.setTimeout(() => setIsToastVisible(false), TOAST_DURATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, [isToastVisible]);

  const handleGoHome = () => {
    router.push('/home');
  };

  const handleSaveResult = () => {
    // 이미 진행 종료 시점에 저장됨 — 명시적 저장 토스트만 노출
    setIsToastVisible(true);
  };

  const handleConfirmSaved = () => {
    setIsToastVisible(false);
    router.push('/wishlist');
  };

  if (!result) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg-layer-basement">
        <p className="body-1-medium text-text-neutral-tertiary">결과를 불러오는 중...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col overflow-x-hidden bg-bg-layer-basement pt-15 pb-30">
      <h1 className="shrink-0 px-5 text-center text-[28px] leading-10 font-bold tracking-[-0.6px]">
        <span className="text-blue-500">{TOURNAMENT_NAME_FALLBACK} </span>
        <br />
        <span className="text-text-neutral-primary">승자는</span>
      </h1>

      <div className="mx-auto mt-3 flex min-h-0 w-full max-w-[420px] flex-1 flex-col">
        <ReceiptDrawMachine tournamentName={TOURNAMENT_NAME_FALLBACK} result={result} date={date} />
      </div>

      {/* 저장 완료 토스트 — 하단 버튼 영역 위에 살짝 겹침 */}
      <div className="pointer-events-none fixed right-0 bottom-25 left-0 z-40 mx-auto w-full max-w-120 px-5">
        <div className="pointer-events-auto">
          <ActionSnackbar
            message="보관함에 결과를 저장했어요."
            actionLabel="확인하기"
            isVisible={isToastVisible}
            onAction={handleConfirmSaved}
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <BottomCta>
        <button
          type="button"
          onClick={handleGoHome}
          className="flex h-[54px] flex-1 items-center justify-center rounded-xl border border-gray-200 bg-bg-layer-default body-1-semibold text-text-neutral-primary"
        >
          홈으로 가기
        </button>
        <button
          type="button"
          onClick={handleSaveResult}
          className="flex h-[54px] flex-1 items-center justify-center rounded-xl bg-gray-950 body-1-semibold text-white"
        >
          결과 저장하기
        </button>
      </BottomCta>
    </main>
  );
}

export default TournamentResultPage;
