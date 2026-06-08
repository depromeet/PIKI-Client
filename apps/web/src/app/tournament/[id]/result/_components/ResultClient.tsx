'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ROUTES } from '@/consts/route';

import { useGetTournament } from '../../_common/_hooks/useGetTournament';
import ReceiptDrawMachine from './ReceiptDrawMachine';
import GroupResultEntryCard from './group-result-entry-card/GroupResultEntryCard';
import PlateShareDialog from './plate-share-dialog/PlateShareDialog';

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
    router.replace(ROUTES.TOURNAMENT_MATCH(tournamentId));
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
    router.push(ROUTES.HOME);
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

      <div className="mx-auto mt-3 flex min-h-0 w-full max-w-[420px] flex-1 flex-col gap-3 px-5">
        <ReceiptDrawMachine
          tournamentName={tournamentName}
          result={result}
          date={date}
          // 플레이 링크 공유는 ROOT 의 소유자만 가능 — CLONE 소유자(친구 초대 → CLONE 생성한 사람)는 제외
          canSharePlayLink={tournamentData.isRoot && tournamentData.isOwner}
          onSharePlayLink={handleOpenShare}
        />

        {tournamentData.completed.hasGroupResult && (
          <GroupResultEntryCard tournamentId={tournamentId} />
        )}
      </div>

      {/* 하단 버튼 — 시안상 단일 CTA */}
      <div className="fixed right-0 bottom-0 left-0 z-30 mx-auto flex w-full max-w-120 items-center bg-bg-layer-basement px-5 pt-3 pb-5">
        <button
          type="button"
          onClick={handleGoHome}
          className="flex h-13.5 flex-1 cursor-pointer items-center justify-center rounded-xl bg-gray-950 body-1-semibold text-white"
        >
          홈으로 가기
        </button>
      </div>

      <PlateShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        tournamentId={tournamentId}
        initialPlayLinkExpiresAt={tournamentData.completed.playLinkExpiresAt}
      />
    </main>
  );
}

export default ResultClient;
