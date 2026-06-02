'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useGetTournament } from '../../_common/_hooks/useGetTournament';
import PlateShareDialog from './plate-share-dialog/PlateShareDialog';
import ReceiptDrawMachine from './ReceiptDrawMachine';

type ResultClientProps = {
  tournamentId: number;
};

function ResultClient({ tournamentId }: ResultClientProps) {
  const router = useRouter();
  const { tournamentData } = useGetTournament(tournamentId);
  const [date] = useState(() => new Date());
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  // RSC에서 status 검사를 하지만, 클라에서 status가 바뀐 경우 방어
  useEffect(() => {
    if (tournamentData.status === 'COMPLETED') return;
    router.replace(`/tournament/${tournamentId}/match`);
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
  const plateUrl = `https://piki.today/tournament/${tournamentId}/plate`;

  const handleGoHome = () => {
    router.push('/home');
  };

  const handleSaveResult = () => {
    // 이미 진행 종료 시점에 서버에서 저장됨 — 명시적 저장 토스트만 노출
    toast.info('보관함에 결과를 저장했어요.');
  };

  const handleOpenShare = () => {
    setIsShareDialogOpen(true);
  };

  return (
    <main className="flex min-h-dvh flex-col overflow-x-hidden bg-bg-layer-basement pt-[calc(env(safe-area-inset-top)+60px)] pb-[120px]">
      <h1 className="shrink-0 px-5 text-center text-[28px] leading-10 font-bold tracking-[-0.6px]">
        <span className="text-blue-500">{tournamentName} </span>
        <br />
        <span className="text-text-neutral-primary">승자는</span>
      </h1>

      <div className="mx-auto mt-3 flex min-h-0 w-full max-w-[420px] flex-1 flex-col">
        <ReceiptDrawMachine
          tournamentName={tournamentName}
          result={result}
          date={date}
          onSharePlayLink={handleOpenShare}
        />
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

      <PlateShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        plateUrl={plateUrl}
      />
    </main>
  );
}

export default ResultClient;
