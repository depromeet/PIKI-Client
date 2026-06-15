'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { ChevronBackwardIconFill } from '@/assets/icons/fill';
import ReceiptIcon from '@/assets/images/tournament/result/receipt-icon.svg';
import SmileIcon from '@/assets/images/tournament/result/smile-icon.svg';
import { ROUTES } from '@/consts/route';
import { cn } from '@/utils/cn';

import { useGetTournament } from '../../_common/_hooks/useGetTournament';
import { shareReceiptImage } from '../_utils/shareReceiptImage';
import ReceiptDrawMachine, { type ReceiptDrawMachineHandleT } from './ReceiptDrawMachine';
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
  const [isCapturing, setIsCapturing] = useState(false);
  // 동기 락 — setState 가 비동기라 빠른 연속 클릭 시 같은 이벤트 루프에서 재진입되는 걸 막는다.
  const isCapturingRef = useRef(false);
  const receiptMachineRef = useRef<ReceiptDrawMachineHandleT | null>(null);

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
  // 플레이 링크 공유는 ROOT 의 소유자만 가능 — CLONE 소유자(친구 초대 → CLONE 생성한 사람) 제외
  const canSharePlayLink = tournamentData.isRoot && tournamentData.isOwner;

  const handleGoHome = () => {
    router.push(ROUTES.HOME);
  };

  const handleShareReceiptImage = async () => {
    const element = receiptMachineRef.current?.getReceiptPaperElement();
    if (!element || isCapturingRef.current) return;

    isCapturingRef.current = true;
    setIsCapturing(true);
    try {
      await shareReceiptImage(element);
    } catch {
      toast.error('영수증 이미지를 만들지 못했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      isCapturingRef.current = false;
      setIsCapturing(false);
    }
  };

  const handleSharePlayLink = () => {
    setIsShareDialogOpen(true);
  };

  return (
    <main className="flex min-h-dvh flex-col overflow-x-hidden bg-bg-layer-basement pt-status pb-30">
      <header className="relative flex h-7.5 w-full shrink-0 items-center px-5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => router.back()}
          className="cursor-pointer p-0.75"
        >
          <ChevronBackwardIconFill className="size-6 text-icon-neutral-secondary" />
        </button>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 heading-1 text-text-neutral-primary">
          토너먼트 결과
        </h1>
      </header>

      <div className="mx-auto mt-3 flex min-h-0 w-full max-w-105 flex-1 flex-col gap-3 px-5">
        <ReceiptDrawMachine
          ref={receiptMachineRef}
          tournamentName={tournamentName}
          result={result}
          date={date}
        />

        {/* 영수증 밖 공유 버튼 — 이미지 공유 (모든 사용자) + 토너먼트 플레이 체험 (ROOT 소유자만) */}
        <div className={cn('flex gap-2', !canSharePlayLink && 'justify-center')}>
          <ShareButton
            icon={<ReceiptIcon aria-hidden className="size-5" />}
            label={isCapturing ? '이미지 만드는 중...' : '영수증 이미지 공유'}
            onClick={handleShareReceiptImage}
            disabled={isCapturing}
          />
          {canSharePlayLink && (
            <ShareButton
              icon={<SmileIcon aria-hidden className="size-4.25" />}
              label="토너먼트 플레이 체험"
              onClick={handleSharePlayLink}
            />
          )}
        </div>

        {/*
          친구 토너먼트 결과보기 카드 노출 + 라우팅.
          - 그룹 결과 조회는 ROOT 토너먼트 id 로만 가능 (백엔드 정책)
          - ROOT 사용자(주최자 / 친구 초대 멤버): 본인 id 가 ROOT 라 그대로 사용
          - CLONE 사용자(플레이 링크 게스트): 응답의 sourceTournamentId 로 ROOT 지정
          - 친구 유무는 클릭 시 group-result API 응답으로 판단한다 (캐시 의존 X)
        */}
        <GroupResultEntryCard
          tournamentId={
            tournamentData.isRoot
              ? tournamentId
              : (tournamentData.sourceTournamentId ?? tournamentId)
          }
        />
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

type ShareButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function ShareButton({ icon, label, onClick, disabled = false }: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-13 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-bg-layer-default body-2-semibold text-text-neutral-primary disabled:cursor-default disabled:opacity-60"
    >
      {icon}
      {label}
    </button>
  );
}

export default ResultClient;
