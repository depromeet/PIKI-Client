'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ActionSnackbar from '@/components/common/toast/ActionSnackbar';

import { useGetTournament } from '../../../_hooks/useGetTournament';
import ReceiptDrawMachine from './ReceiptDrawMachine';

const TOAST_DURATION_MS = 3000;

type ResultClientProps = {
  tournamentId: number;
};

function ResultClient({ tournamentId }: ResultClientProps) {
  const router = useRouter();
  const { tournamentData } = useGetTournament(tournamentId);
  const [date] = useState(() => new Date());
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!isToastVisible) return;
    const timeoutId = window.setTimeout(() => setIsToastVisible(false), TOAST_DURATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, [isToastVisible]);

  // COMPLETED 아닌 상태로 들어왔으면 진행 페이지로 보냄
  useEffect(() => {
    if (tournamentData.status === 'COMPLETED') return;
    router.replace(`/tournament/${tournamentId}`);
  }, [tournamentData.status, router, tournamentId]);

  if (tournamentData.status !== 'COMPLETED') {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg-layer-basement">
        <p className="body-1-medium text-text-neutral-tertiary">결과를 불러오는 중...</p>
      </main>
    );
  }

  const tournamentName = tournamentData.name;
  const result = tournamentData.completed.result;

  const handleGoHome = () => {
    router.push('/home');
  };

  const handleSaveResult = () => {
    // 이미 진행 종료 시점에 서버에서 저장됨 — 명시적 저장 토스트만 노출
    setIsToastVisible(true);
  };

  const handleConfirmSaved = () => {
    setIsToastVisible(false);
    router.push('/wishlist');
  };

  return (
    <main className="flex min-h-dvh flex-col overflow-x-hidden bg-bg-layer-basement pt-[calc(env(safe-area-inset-top)+60px)] pb-[120px]">
      <h1 className="shrink-0 px-5 text-center text-[28px] leading-10 font-bold tracking-[-0.6px]">
        <span className="text-blue-500">{tournamentName} </span>
        <br />
        <span className="text-text-neutral-primary">승자는</span>
      </h1>

      <div className="mx-auto mt-3 flex min-h-0 w-full max-w-[420px] flex-1 flex-col">
        <ReceiptDrawMachine tournamentName={tournamentName} result={result} date={date} />
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
      <div className="fixed right-0 bottom-0 left-0 z-30 mx-auto flex w-full max-w-120 items-center gap-2.5 bg-bg-layer-basement px-5 pt-3 pb-5">
        <button
          type="button"
          onClick={handleGoHome}
          className="flex h-[54px] flex-1 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-bg-layer-default body-1-semibold text-text-neutral-primary"
        >
          홈으로 가기
        </button>
        <button
          type="button"
          onClick={handleSaveResult}
          className="flex h-[54px] flex-1 cursor-pointer items-center justify-center rounded-xl bg-gray-950 body-1-semibold text-white"
        >
          결과 저장하기
        </button>
      </div>
    </main>
  );
}

export default ResultClient;
