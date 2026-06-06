'use client';

import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/button';
import Spinner from '@/components/spinner';
import { ROUTES } from '@/consts/route';

import { getInvitePreviewByCode } from '../../../tournament/join/_apis/getInvitePreviewByCode';

type InviteClientProps = {
  tournamentId: number;
  inviteCode: string;
};

type InviteStateT = 'loading' | 'invalid';

function InviteClient({ tournamentId, inviteCode }: InviteClientProps) {
  const router = useRouter();
  const [state, setState] = useState<InviteStateT>('loading');
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const run = async () => {
      // 코드 없이 진입 → 잘못된 링크
      if (!inviteCode) {
        setState('invalid');
        return;
      }

      try {
        const preview = await getInvitePreviewByCode(inviteCode);
        // 코드의 토너먼트가 URL path와 다르면 잘못된 링크
        if (preview.tournamentId !== tournamentId) {
          setState('invalid');
          return;
        }
        router.replace(ROUTES.TOURNAMENT_JOIN_BY_LINK(tournamentId));
      } catch (error) {
        // 400 (코드 불일치) / 409 (만료) — 잘못된 링크로 통합
        if (isAxiosError(error)) {
          setState('invalid');
          return;
        }
        setState('invalid');
      }
    };

    void run();
  }, [router, tournamentId, inviteCode]);

  if (state === 'loading') {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg-layer-basement">
        <div className="flex flex-col items-center gap-3">
          <Spinner size={32} />
          <p className="body-1-medium text-text-neutral-tertiary">초대 정보를 확인하고 있어요...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-bg-layer-basement px-5">
      <div className="flex flex-col items-center gap-2">
        <p className="heading-1 text-text-neutral-primary">초대 링크가 유효하지 않아요</p>
        <p className="text-center body-1-medium text-text-neutral-tertiary">
          만료됐거나 잘못된 링크일 수 있어요.
          <br />
          친구에게 새 링크를 요청해주세요.
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

export default InviteClient;
