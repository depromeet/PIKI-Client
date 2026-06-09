'use client';

import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/button';
import Spinner from '@/components/spinner';
import { ROUTES } from '@/consts/route';

import { postGuestLogin } from '../../../login/_apis/postGuestLogin';
import { postFromPlayLink } from '../../_apis/postFromPlayLink';

type PlayClientProps = {
  sourceTournamentId: number;
};

type PlayStateT = 'loading' | 'expired';

function PlayClient({ sourceTournamentId }: PlayClientProps) {
  const router = useRouter();
  const [state, setState] = useState<PlayStateT>('loading');
  const hasRunRef = useRef(false);

  useEffect(() => {
    // StrictMode/dev double-invoke 방지
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const run = async () => {
      try {
        const newTournamentId = await postFromPlayLink(sourceTournamentId);
        // /match 페이지의 status 가드가 자동으로 적절한 화면으로 라우팅한다:
// - PENDING: 자동 start 후 매치 진행
// - IN_PROGRESS + pending 페이로드: create 로 리다이렉트
// - COMPLETED: result 로 리다이렉트 (재진입 사용자의 경우)
router.replace(ROUTES.TOURNAMENT_MATCH(newTournamentId));
      } catch (error) {
        // 401: 미인증 → 게스트 자동 발급 후 재시도
        if (isAxiosError(error) && error.response?.status === 401) {
          try {
            await postGuestLogin();
            const newTournamentId = await postFromPlayLink(sourceTournamentId);
            // /match 페이지의 status 가드가 자동으로 적절한 화면으로 라우팅한다:
// - PENDING: 자동 start 후 매치 진행
// - IN_PROGRESS + pending 페이로드: create 로 리다이렉트
// - COMPLETED: result 로 리다이렉트 (재진입 사용자의 경우)
router.replace(ROUTES.TOURNAMENT_MATCH(newTournamentId));
            return;
          } catch {
            setState('expired');
            return;
          }
        }
        // 404 (없음) / 409 (만료) — 만료 안내로 통합.
        // 같은 사용자의 재진입은 백엔드가 idempotent 로 처리해 200 + 기존 CLONE id 반환한다.
        setState('expired');
      }
    };

    void run();
  }, [router, sourceTournamentId]);

  if (state === 'loading') {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg-layer-basement">
        <div className="flex flex-col items-center gap-3">
          <Spinner size={32} />
          <p className="body-1-medium text-text-neutral-tertiary">토너먼트를 준비하고 있어요...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-bg-layer-basement px-5">
      <div className="flex flex-col items-center gap-2">
        <p className="heading-1 text-text-neutral-primary">플레이 링크가 유효하지 않아요</p>
        <p className="text-center body-1-medium text-text-neutral-tertiary">
          만료됐거나 이미 진행한 토너먼트일 수 있어요.
          <br />
          공유한 친구에게 새 링크를 요청해주세요.
        </p>
      </div>

      <Link href={ROUTES.HOME} className="w-full max-w-80">
        <Button size="lg" variant="primary" className="w-full">
          홈으로 가기
        </Button>
      </Link>
    </main>
  );
}

export default PlayClient;
